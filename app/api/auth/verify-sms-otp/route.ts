import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { otpStorage, validateUSPhoneNumber, cleanPhoneNumber } from '@/lib/otp-storage'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { phoneNumber, otp } = await request.json()
    
    if (!phoneNumber || !otp) {
      return NextResponse.json({ error: 'Phone number and OTP are required' }, { status: 400 })
    }

    // Validate OTP format
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      return NextResponse.json({ error: 'Invalid OTP format' }, { status: 400 })
    }

    // Clean and validate phone number
    const cleanPhone = cleanPhoneNumber(phoneNumber)
    
    if (!validateUSPhoneNumber(cleanPhone)) {
      return NextResponse.json({ error: 'Invalid US phone number format' }, { status: 400 })
    }

    // Verify OTP using shared storage
    const isValid = otpStorage.verifySmsOtp(cleanPhone, otp)
    
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })
    }

    return NextResponse.json({ message: 'Phone number verified successfully' })

  } catch (error) {
    console.error('Error verifying SMS OTP:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
