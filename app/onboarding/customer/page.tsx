'use client'

import { useState, useEffect } from 'react'
import { useUser, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, Check, X, AlertCircle } from 'lucide-react'

interface FormData {
  fullName: string
  email: string
  phoneNumber: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  country: string
  zipCode: string
}

interface FormErrors {
  fullName?: string
  email?: string
  phoneNumber?: string
  addressLine1?: string
  city?: string
  state?: string
  zipCode?: string
  emailOtp?: string
  phoneOtp?: string
  general?: string
}

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'District of Columbia',
  'Puerto Rico', 'Guam', 'U.S. Virgin Islands', 'American Samoa', 'Northern Mariana Islands',
  'Armed Forces Americas', 'Armed Forces Europe', 'Armed Forces Pacific'
]

export default function CustomerOnboarding() {
  const { isSignedIn, user, isLoaded } = useUser()
  const { getToken } = useAuth()
  const router = useRouter()
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: 'United States',
    zipCode: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // OTP States
  const [emailOtp, setEmailOtp] = useState('')
  const [phoneOtp, setPhoneOtp] = useState('')
  const [emailVerified, setEmailVerified] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [emailOtpSent, setEmailOtpSent] = useState(false)
  const [phoneOtpSent, setPhoneOtpSent] = useState(false)
  const [emailOtpLoading, setEmailOtpLoading] = useState(false)
  const [phoneOtpLoading, setPhoneOtpLoading] = useState(false)
  const [emailCountdown, setEmailCountdown] = useState(0)
  const [phoneCountdown, setPhoneCountdown] = useState(0)

  // Check authentication and redirect if needed
  useEffect(() => {
    if (!isLoaded) return
    
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }

    // Check if user already completed onboarding
    const checkOnboardingStatus = async () => {
      try {
        const response = await fetch('/api/customers/check-onboarding', {
          headers: {
            'Authorization': `Bearer ${await getToken()}`
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.exists) {
            router.push('/')
          }
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error)
      }
    }

    checkOnboardingStatus()
  }, [isLoaded, isSignedIn, user, router])

  // Pre-fill email from Clerk if available
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setFormData(prev => ({ ...prev, email: user.primaryEmailAddress!.emailAddress }))
    }
  }, [user])

  // Countdown timers for OTP resend
  useEffect(() => {
    if (emailCountdown > 0) {
      const timer = setTimeout(() => setEmailCountdown(emailCountdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [emailCountdown])

  useEffect(() => {
    if (phoneCountdown > 0) {
      const timer = setTimeout(() => setPhoneCountdown(phoneCountdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [phoneCountdown])

  const validateFullName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z\s\-']{2,100}$/
    return nameRegex.test(name)
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    return phoneRegex.test(phone)
  }

  const validateZipCode = (zip: string): boolean => {
    const zipRegex = /^\d{5}(-\d{4})?$/
    return zipRegex.test(zip)
  }

  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '')
    if (digits.length <= 3) {
      return digits
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
    }
  }

  const formatZipCode = (value: string): string => {
    const digits = value.replace(/\D/g, '')
    if (digits.length <= 5) {
      return digits
    } else {
      return `${digits.slice(0, 5)}-${digits.slice(5, 9)}`
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    let formattedValue = value
    
    if (field === 'phoneNumber') {
      formattedValue = formatPhoneNumber(value)
    } else if (field === 'zipCode') {
      formattedValue = formatZipCode(value)
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }))
    
    // Clear error for this field when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const sendEmailOtp = async () => {
    if (!validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }))
      return
    }

    setEmailOtpLoading(true)
    setErrors(prev => ({ ...prev, email: undefined }))

    try {
      const response = await fetch('/api/auth/send-email-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getToken()}`
        },
        body: JSON.stringify({ email: formData.email })
      })

      if (response.ok) {
        setEmailOtpSent(true)
        setEmailCountdown(120)
        setErrors(prev => ({ ...prev, email: undefined }))
      } else {
        const data = await response.json()
        setErrors(prev => ({ ...prev, email: data.error || 'Failed to send OTP' }))
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, email: 'Failed to send OTP. Please try again.' }))
    } finally {
      setEmailOtpLoading(false)
    }
  }

  const sendPhoneOtp = async () => {
    if (!validatePhoneNumber(formData.phoneNumber)) {
      setErrors(prev => ({ ...prev, phoneNumber: 'Please enter a valid 10-digit US phone number' }))
      return
    }

    setPhoneOtpLoading(true)
    setErrors(prev => ({ ...prev, phoneNumber: undefined }))

    try {
      const response = await fetch('/api/auth/send-sms-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getToken()}`
        },
        body: JSON.stringify({ phoneNumber: formData.phoneNumber })
      })

      if (response.ok) {
        setPhoneOtpSent(true)
        setPhoneCountdown(120)
        setErrors(prev => ({ ...prev, phoneNumber: undefined }))
      } else {
        const data = await response.json()
        setErrors(prev => ({ ...prev, phoneNumber: data.error || 'Failed to send SMS OTP' }))
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, phoneNumber: 'Failed to send SMS. Please try again.' }))
    } finally {
      setPhoneOtpLoading(false)
    }
  }

  const verifyEmailOtp = async () => {
    if (emailOtp.length !== 6) {
      setErrors(prev => ({ ...prev, emailOtp: 'Please enter a 6-digit OTP' }))
      return
    }

    try {
      const response = await fetch('/api/auth/verify-email-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getToken()}`
        },
        body: JSON.stringify({ email: formData.email, otp: emailOtp })
      })

      if (response.ok) {
        setEmailVerified(true)
        setErrors(prev => ({ ...prev, emailOtp: undefined }))
      } else {
        const data = await response.json()
        setErrors(prev => ({ ...prev, emailOtp: data.error || 'Invalid OTP' }))
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, emailOtp: 'Verification failed. Please try again.' }))
    }
  }

  const verifyPhoneOtp = async () => {
    if (phoneOtp.length !== 6) {
      setErrors(prev => ({ ...prev, phoneOtp: 'Please enter a 6-digit OTP' }))
      return
    }

    try {
      const response = await fetch('/api/auth/verify-sms-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getToken()}`
        },
        body: JSON.stringify({ phoneNumber: formData.phoneNumber, otp: phoneOtp })
      })

      if (response.ok) {
        setPhoneVerified(true)
        setErrors(prev => ({ ...prev, phoneOtp: undefined }))
      } else {
        const data = await response.json()
        setErrors(prev => ({ ...prev, phoneOtp: data.error || 'Invalid OTP' }))
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, phoneOtp: 'Verification failed. Please try again.' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!validateFullName(formData.fullName)) {
      newErrors.fullName = 'Please enter a valid name (letters, spaces, hyphens, and apostrophes only)'
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!emailVerified) {
      newErrors.emailOtp = 'Please verify your email address'
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit US phone number'
    }

    if (!phoneVerified) {
      newErrors.phoneOtp = 'Please verify your phone number'
    }

    if (formData.addressLine1.length < 5) {
      newErrors.addressLine1 = 'Address Line 1 is required (minimum 5 characters)'
    }

    if (formData.city.length < 2) {
      newErrors.city = 'Please enter a valid city name'
    }

    if (!formData.state || formData.state === 'Select State') {
      newErrors.state = 'Please select a state'
    }

    if (!validateZipCode(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid US ZIP code (5 digits or ZIP+4 format: 12345 or 12345-6789)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const customerData = {
        clerk_user_id: user!.id,
        full_name: formData.fullName,
        email: formData.email,
        phone_number: `+1${formData.phoneNumber.replace(/\D/g, '')}`,
        address_line_1: formData.addressLine1,
        address_line_2: formData.addressLine2 || null,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pin_code: formData.zipCode
      }

      const response = await fetch('/api/customers/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getToken()}`
        },
        body: JSON.stringify(customerData)
      })

      if (response.ok) {
        router.push('/')
      } else {
        const data = await response.json()
        setErrors(prev => ({ ...prev, general: data.error || 'Registration failed' }))
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, general: 'Registration failed. Please try again.' }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    return (
      validateFullName(formData.fullName) &&
      validateEmail(formData.email) &&
      emailVerified &&
      validatePhoneNumber(formData.phoneNumber) &&
      phoneVerified &&
      formData.addressLine1.length >= 5 &&
      formData.city.length >= 2 &&
      formData.state && formData.state !== 'Select State' &&
      validateZipCode(formData.zipCode)
    )
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Complete Your Profile
              </h1>
              <p className="text-gray-600">
                Please provide your details to continue. We'll verify your email and phone number via SMS for security.
              </p>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-700">{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={errors.fullName ? 'border-red-500' : ''}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              {/* Email with OTP */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                    readOnly={!!user?.primaryEmailAddress?.emailAddress}
                  />
                  <Button
                    type="button"
                    onClick={sendEmailOtp}
                    disabled={emailOtpLoading || emailCountdown > 0 || !!user?.primaryEmailAddress?.emailAddress}
                    className="px-4"
                  >
                    {emailOtpLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : emailCountdown > 0 ? (
                      `Resend OTP (${emailCountdown}s)`
                    ) : emailOtpSent ? (
                      'Resend OTP'
                    ) : (
                      'Send OTP'
                    )}
                  </Button>
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
                {emailOtpSent && !errors.email && (
                  <p className="mt-1 text-sm text-green-600">
                    OTP sent to your email. Please check your inbox.
                  </p>
                )}

                {/* Email OTP Input */}
                {emailOtpSent && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter OTP
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={emailOtp}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                          setEmailOtp(value)
                          if (value.length === 6) {
                            verifyEmailOtp()
                          }
                        }}
                        className={errors.emailOtp ? 'border-red-500' : ''}
                        maxLength={6}
                      />
                      {emailVerified && (
                        <div className="flex items-center text-green-600">
                          <Check className="h-5 w-5" />
                        </div>
                      )}
                      {!emailVerified && emailOtp.length === 6 && (
                        <div className="flex items-center text-red-600">
                          <X className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    {errors.emailOtp && (
                      <p className="mt-1 text-sm text-red-600">{errors.emailOtp}</p>
                    )}
                    {emailVerified && (
                      <p className="mt-1 text-sm text-green-600">Email verified successfully</p>
                    )}
                  </div>
                )}
              </div>

              {/* Phone Number with SMS OTP */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                    <span className="text-sm font-medium">🇺🇸 +1</span>
                  </div>
                  <Input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className={`rounded-l-none ${errors.phoneNumber ? 'border-red-500' : ''}`}
                  />
                  <Button
                    type="button"
                    onClick={sendPhoneOtp}
                    disabled={phoneOtpLoading || phoneCountdown > 0}
                    className="rounded-l-none"
                  >
                    {phoneOtpLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : phoneCountdown > 0 ? (
                      `Resend OTP (${phoneCountdown}s)`
                    ) : phoneOtpSent ? (
                      'Resend OTP'
                    ) : (
                      'Send OTP'
                    )}
                  </Button>
                </div>
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                )}
                {phoneOtpSent && !errors.phoneNumber && (
                  <p className="mt-1 text-sm text-green-600">
                    OTP sent to your phone via SMS. Please check your messages.
                  </p>
                )}

                {/* Phone OTP Input */}
                {phoneOtpSent && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter SMS OTP
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Enter 6-digit SMS code"
                        value={phoneOtp}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                          setPhoneOtp(value)
                          if (value.length === 6) {
                            verifyPhoneOtp()
                          }
                        }}
                        className={errors.phoneOtp ? 'border-red-500' : ''}
                        maxLength={6}
                      />
                      {phoneVerified && (
                        <div className="flex items-center text-green-600">
                          <Check className="h-5 w-5" />
                        </div>
                      )}
                      {!phoneVerified && phoneOtp.length === 6 && (
                        <div className="flex items-center text-red-600">
                          <X className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    {errors.phoneOtp && (
                      <p className="mt-1 text-sm text-red-600">{errors.phoneOtp}</p>
                    )}
                    {phoneVerified && (
                      <p className="mt-1 text-sm text-green-600">Phone number verified successfully</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Enter the 6-digit code sent to your phone via SMS
                    </p>
                  </div>
                )}
              </div>

              {/* Address Line 1 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">Street address, P.O. box, company name</p>
                <Input
                  type="text"
                  placeholder="Street address, apartment, suite, unit, building, floor, etc."
                  value={formData.addressLine1}
                  onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                  className={errors.addressLine1 ? 'border-red-500' : ''}
                />
                {errors.addressLine1 && (
                  <p className="mt-1 text-sm text-red-600">{errors.addressLine1}</p>
                )}
              </div>

              {/* Address Line 2 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address Line 2
                </label>
                <p className="text-xs text-gray-500 mb-2">(Optional) Apartment, suite, unit, building, floor, etc.</p>
                <Input
                  type="text"
                  placeholder="Apartment, suite, unit, building, floor (optional)"
                  value={formData.addressLine2}
                  onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={errors.city ? 'border-red-500' : ''}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              {/* State Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.state ? 'border-red-500' : ''}`}
                >
                  <option value="">Select State</option>
                  {US_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                )}
              </div>

              {/* Country (Read-only) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.country}
                  readOnly
                  className="bg-gray-100 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-gray-500 italic">
                  Currently, we only serve customers in the United States
                </p>
              </div>

              {/* ZIP Code */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="ZIP Code (e.g., 12345 or 12345-6789)"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className={errors.zipCode ? 'border-red-500' : ''}
                />
                {errors.zipCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className="w-full h-14 text-base font-bold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    'Complete Registration'
                  )}
                </Button>
                {!isFormValid() && (
                  <p className="mt-2 text-sm text-gray-500 text-center">
                    Please complete all required fields and verify your email and phone number via SMS
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
