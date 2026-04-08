import { NextResponse } from 'next/server';

// In-memory OTP store (in production: use Redis/DB)
const otpStore = new Map<string, { otp: string; expires: number }>();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, action, otp } = body;

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 });
    }

    if (action === 'send') {
      // Generate 6-digit OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

      otpStore.set(phone, { otp: generatedOtp, expires });

      // In production: call WhatsApp Business API (Twilio/Meta) here
      // Example: await sendWhatsAppOtp(phone, generatedOtp);
      console.log(`[WhatsApp OTP] Phone: ${phone}, OTP: ${generatedOtp}`);

      return NextResponse.json({
        message: 'OTP sent successfully',
        // Demo mode: return OTP (remove in production)
        demoOtp: generatedOtp,
      }, { status: 200 });
    }

    if (action === 'verify') {
      if (!otp) {
        return NextResponse.json({ error: 'OTP is required.' }, { status: 400 });
      }

      const stored = otpStore.get(phone);
      if (!stored) {
        return NextResponse.json({ error: 'OTP expired or not sent. Please request a new one.' }, { status: 400 });
      }
      if (Date.now() > stored.expires) {
        otpStore.delete(phone);
        return NextResponse.json({ error: 'OTP has expired. Please request a new one.' }, { status: 400 });
      }
      if (stored.otp !== otp) {
        return NextResponse.json({ error: 'Invalid OTP. Please try again.' }, { status: 400 });
      }

      otpStore.delete(phone);
      return NextResponse.json({ message: 'OTP verified successfully' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
  } catch (error) {
    console.error('OTP Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
