// OTP Storage Utility
// In production, replace this with Redis or database storage

interface OtpData {
  otp: string;
  expiresAt: number;
}

class OtpStorage {
  private emailOtps = new Map<string, OtpData>();
  private smsOtps = new Map<string, OtpData>();

  // Email OTP methods
  storeEmailOtp(email: string, otp: string): void {
    const expiresAt = Date.now() + (2 * 60 * 1000); // 2 minutes
    this.emailOtps.set(email, { otp, expiresAt });
  }

  verifyEmailOtp(email: string, otp: string): boolean {
    const stored = this.emailOtps.get(email);
    if (!stored) {
      return false;
    }

    // Check if OTP has expired
    if (Date.now() > stored.expiresAt) {
      this.emailOtps.delete(email);
      return false;
    }

    // Check if OTP matches
    if (stored.otp === otp) {
      this.emailOtps.delete(email); // Clean up after successful verification
      return true;
    }

    return false;
  }

  // SMS OTP methods
  storeSmsOtp(phoneNumber: string, otp: string): void {
    const expiresAt = Date.now() + (2 * 60 * 1000); // 2 minutes
    this.smsOtps.set(phoneNumber, { otp, expiresAt });
  }

  verifySmsOtp(phoneNumber: string, otp: string): boolean {
    const stored = this.smsOtps.get(phoneNumber);
    if (!stored) {
      return false;
    }

    // Check if OTP has expired
    if (Date.now() > stored.expiresAt) {
      this.smsOtps.delete(phoneNumber);
      return false;
    }

    // Check if OTP matches
    if (stored.otp === otp) {
      this.smsOtps.delete(phoneNumber); // Clean up after successful verification
      return true;
    }

    return false;
  }

  // Cleanup expired OTPs (call this periodically)
  cleanupExpiredOtps(): void {
    const now = Date.now();

    // Clean email OTPs
    for (const [email, data] of this.emailOtps.entries()) {
      if (now > data.expiresAt) {
        this.emailOtps.delete(email);
      }
    }

    // Clean SMS OTPs
    for (const [phone, data] of this.smsOtps.entries()) {
      if (now > data.expiresAt) {
        this.smsOtps.delete(phone);
      }
    }
  }
}

// Export singleton instance
export const otpStorage = new OtpStorage();

// Generate 6-digit OTP
export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Validate email format
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate US phone number format
export function validateUSPhoneNumber(phoneNumber: string): boolean {
  const cleanPhone = phoneNumber.startsWith('+1') ? phoneNumber : `+1${phoneNumber.replace(/\D/g, '')}`;
  const phoneRegex = /^\+1\d{10}$/;
  return phoneRegex.test(cleanPhone);
}

// Clean and format phone number
export function formatPhoneNumber(phoneNumber: string): string {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  if (cleanPhone.length <= 3) {
    return cleanPhone;
  } else if (cleanPhone.length <= 6) {
    return `(${cleanPhone.slice(0, 3)}) ${cleanPhone.slice(3)}`;
  } else {
    return `(${cleanPhone.slice(0, 3)}) ${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6, 10)}`;
  }
}

// Clean phone number for storage (with +1 prefix)
export function cleanPhoneNumber(phoneNumber: string): string {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  return `+1${cleanPhone}`;
}
