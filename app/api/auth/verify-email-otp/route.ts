import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { otpStorage } from '@/lib/otp-storage'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { email, otp } = await request.json()
    
    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 })
    }

    // Validate OTP format
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      return NextResponse.json({ error: 'Invalid OTP format' }, { status: 400 })
    }

    // Verify OTP using shared storage
    const isValid = otpStorage.verifyEmailOtp(email, otp)
    
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })
    }

    return NextResponse.json({ message: 'Email verified successfully' })

  } catch (error) {
    console.error('Error verifying email OTP:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
