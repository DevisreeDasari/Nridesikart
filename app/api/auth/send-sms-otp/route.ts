import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { otpStorage, generateOtp, validateUSPhoneNumber, cleanPhoneNumber } from '@/lib/otp-storage'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { phoneNumber } = await request.json()
    
    if (!phoneNumber) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }

    // Clean and validate US phone number format
    const cleanPhone = cleanPhoneNumber(phoneNumber)
    
    if (!validateUSPhoneNumber(cleanPhone)) {
      return NextResponse.json({ error: 'Invalid US phone number format' }, { status: 400 })
    }

    // Generate 6-digit OTP
    const otp = generateOtp()

    // Store OTP
    otpStorage.storeSmsOtp(cleanPhone, otp)

    // TODO: Send SMS with OTP using service like Twilio, AWS SNS, Vonage
    // For now, we'll log it (in production, integrate with SMS service)
    console.log(`SMS OTP for ${cleanPhone}: ${otp}`)
    console.log(`SMS message: Your NRIDesiKart verification code is: ${otp}. Valid for 2 minutes. Do not share this code.`)

    // For development, you can return OTP in response
    // Remove this in production!
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ 
        message: 'SMS OTP sent successfully',
        otp: otp, // Only for development
        phoneNumber: cleanPhone
      })
    }

    return NextResponse.json({ message: 'SMS OTP sent successfully' })

  } catch (error) {
    console.error('Error sending SMS OTP:', error)
    return NextResponse.json({ error: 'Failed to send SMS OTP' }, { status: 500 })
  }
}
