import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly resend: Resend | null = null;
  private readonly fromEmail: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY') || process.env.RESEND_API_KEY;
    this.fromEmail =
      this.configService.get<string>('MAIL_FROM') ||
      process.env.MAIL_FROM ||
      'LankaDirect <onboarding@resend.dev>';

    if (apiKey && apiKey.startsWith('re_')) {
      this.resend = new Resend(apiKey);
      this.logger.log('📧 Resend Mail Service initialized with production API key.');
    } else {
      this.logger.warn(
        '⚠️ RESEND_API_KEY is not set or placeholder. Verification emails will be logged to console in dev mode.'
      );
    }
  }

  /**
   * Send 6-digit OTP verification email
   */
  async sendVerificationOtp(email: string, fullName: string, otp: string): Promise<boolean> {
    const subject = `LankaDirect - Verify your email address (OTP: ${otp})`;

    // Beautiful HTML Email Template matching LankaDirect Brand
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAFBFD; margin: 0; padding: 30px; color: #1E293B; }
            .container { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 24px; padding: 40px 32px; border: 1px solid #E2E8F0; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
            .logo { font-size: 22px; font-weight: 900; color: #0F172A; text-decoration: none; display: inline-block; margin-bottom: 24px; }
            .logo span { color: #EA580C; }
            .heading { font-size: 20px; font-weight: 800; color: #0F172A; margin: 0 0 12px 0; }
            .text { font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px 0; }
            .otp-box { background: #FFF7ED; border: 2px dashed #FDBA74; border-radius: 16px; padding: 20px; text-align: center; margin: 28px 0; }
            .otp-code { font-family: 'Courier New', monospace; font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #C2410C; margin: 0; }
            .expiry-note { font-size: 12px; color: #9A3412; font-weight: 600; margin-top: 8px; }
            .security-note { font-size: 12px; line-height: 1.5; color: #94A3B8; border-top: 1px solid #F1F5F9; padding-top: 20px; margin-top: 32px; }
          </style>
        </head>
        <body>
          <div class="container">
            <a href="https://lankadirect.lk" class="logo">Lanka<span>Direct</span></a>
            <h1 class="heading">Ayubowan, ${fullName}!</h1>
            <p class="text">
              Thank you for registering with LankaDirect. To complete your account activation and verify that this email belongs to you, please enter the 6-digit verification code below:
            </p>
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
              <div class="expiry-note">⏱️ Valid for 10 minutes only</div>
            </div>
            <p class="text">
              If you did not request this registration, please safely ignore this email. No account will be activated without this verification code.
            </p>
            <div class="security-note">
              🔒 LankaDirect Retail (Pvt) Ltd • 256-Bit SSL Encrypted Regional Retail Protocol<br>
              Colombo • Western Province, Sri Lanka
            </div>
          </div>
        </body>
      </html>
    `;

    if (this.resend) {
      try {
        const { error } = await this.resend.emails.send({
          from: this.fromEmail,
          to: email,
          subject,
          html,
        });

        if (error) {
          this.logger.error(`Resend API Error: ${error.message}`, error);
          // Fallback log to console so developers can proceed
          this.logger.log(`🔑 DEV OTP FALLBACK FOR [${email}]: ${otp}`);
          return false;
        }

        this.logger.log(`✅ Verification OTP email dispatched via Resend to: ${email}`);
        return true;
      } catch (err: any) {
        this.logger.error(`Failed to send email via Resend: ${err?.message}`);
        this.logger.log(`🔑 DEV OTP FALLBACK FOR [${email}]: ${otp}`);
        return false;
      }
    } else {
      // In local dev without key, log directly in console with clear formatting
      console.log('\n======================================================');
      console.log(`📧 [LANKADIRECT EMAIL VERIFICATION OTP]`);
      console.log(`👤 Recipient: ${fullName} <${email}>`);
      console.log(`🔑 6-Digit OTP Code: >>> ${otp} <<<`);
      console.log(`⏱️ Expiry: 10 minutes`);
      console.log('======================================================\n');
      return true;
    }
  }

  /**
   * Send 6-digit Password Reset OTP email
   */
  async sendPasswordResetOtp(email: string, fullName: string, otp: string): Promise<boolean> {
    const subject = `LankaDirect - Password Reset Code (OTP: ${otp})`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAFBFD; margin: 0; padding: 30px; color: #1E293B; }
            .container { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 24px; padding: 40px 32px; border: 1px solid #E2E8F0; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
            .logo { font-size: 22px; font-weight: 900; color: #0F172A; text-decoration: none; display: inline-block; margin-bottom: 24px; }
            .logo span { color: #EA580C; }
            .heading { font-size: 20px; font-weight: 800; color: #0F172A; margin: 0 0 12px 0; }
            .text { font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px 0; }
            .otp-box { background: #FFF7ED; border: 2px dashed #FDBA74; border-radius: 16px; padding: 20px; text-align: center; margin: 28px 0; }
            .otp-code { font-family: 'Courier New', monospace; font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #C2410C; margin: 0; }
            .expiry-note { font-size: 12px; color: #9A3412; font-weight: 600; margin-top: 8px; }
            .security-note { font-size: 12px; line-height: 1.5; color: #94A3B8; border-top: 1px solid #F1F5F9; padding-top: 20px; margin-top: 32px; }
          </style>
        </head>
        <body>
          <div class="container">
            <a href="https://lankadirect.lk" class="logo">Lanka<span>Direct</span></a>
            <h1 class="heading">Password Reset Request</h1>
            <p class="text">
              Ayubowan ${fullName}, we received a request to reset the password for your LankaDirect account. Use the 6-digit verification code below to set your new password:
            </p>
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
              <div class="expiry-note">⏱️ Valid for 10 minutes only</div>
            </div>
            <p class="text">
              If you did not request this password reset, please safely ignore this email or check your account security settings. Your password remains unchanged until verified.
            </p>
            <div class="security-note">
              🔒 LankaDirect Retail (Pvt) Ltd • 256-Bit SSL Encrypted Regional Retail Protocol<br>
              Colombo • Western Province, Sri Lanka
            </div>
          </div>
        </body>
      </html>
    `;

    if (this.resend) {
      try {
        const { error } = await this.resend.emails.send({
          from: this.fromEmail,
          to: email,
          subject,
          html,
        });

        if (error) {
          this.logger.error(`Resend API Error: ${error.message}`, error);
          this.logger.log(`🔑 DEV RESET OTP FALLBACK FOR [${email}]: ${otp}`);
          return false;
        }

        this.logger.log(`✅ Password reset OTP email dispatched via Resend to: ${email}`);
        return true;
      } catch (err: any) {
        this.logger.error(`Failed to send reset email via Resend: ${err?.message}`);
        this.logger.log(`🔑 DEV RESET OTP FALLBACK FOR [${email}]: ${otp}`);
        return false;
      }
    } else {
      console.log('\n======================================================');
      console.log(`🔐 [LANKADIRECT PASSWORD RESET OTP]`);
      console.log(`👤 Recipient: ${fullName} <${email}>`);
      console.log(`🔑 6-Digit Reset Code: >>> ${otp} <<<`);
      console.log(`⏱️ Expiry: 10 minutes`);
      console.log('======================================================\n');
      return true;
    }
  }
}
