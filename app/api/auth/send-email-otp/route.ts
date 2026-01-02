import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { otpStorage, generateOtp, validateEmail } from '@/lib/otp-storage'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Generate 6-digit OTP
    const otp = generateOtp()

    // Store OTP
    otpStorage.storeEmailOtp(email, otp)

    // TODO: Send email with OTP
    // For now, we'll log it (in production, use email service like SendGrid, AWS SES, etc.)
    console.log(`Email OTP for ${email}: ${otp}`)

    // For development, you can return OTP in response
    // Remove this in production!
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ 
        message: 'OTP sent successfully',
        otp: otp // Only for development
      })
    }

    return NextResponse.json({ message: 'OTP sent successfully' })

  } catch (error) {
    console.error('Error sending email OTP:', error)
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
  }
}
