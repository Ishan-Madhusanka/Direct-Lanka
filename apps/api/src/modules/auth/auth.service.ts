import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResendOtpDto } from './dto/resend-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { User, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly googleClient: OAuth2Client;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {
    const googleClientId = this.configService.get<string>('GOOGLE_CLIENT_ID') || process.env.GOOGLE_CLIENT_ID;
    this.googleClient = new OAuth2Client(googleClientId);
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.passwordHash) {
      throw new UnauthorizedException('Account has no password set. Please reset your password.');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Require email verification for customers (Admins are pre-verified)
    if (!user.isEmailVerified && user.role !== UserRole.ADMIN) {
      // Automatically send a fresh OTP to help user complete verification
      const otp = this.generate6DigitOtp();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
      await this.usersService.update(user.id, {
        emailOtp: otp,
        emailOtpExpiresAt: expiresAt,
        otpAttempts: 0,
      });
      await this.mailService.sendVerificationOtp(user.email, user.fullName, otp);

      throw new UnauthorizedException(
        'Your email address is not yet verified. A fresh 6-digit verification code has been dispatched to your inbox.'
      );
    }

    return this.createAuthResponse(user);
  }

  async register(dto: RegisterDto): Promise<{ requiresVerification: boolean; email: string; message: string }> {
    const existing = await this.usersService.findByEmail(dto.email);

    if (existing && existing.isEmailVerified) {
      throw new ConflictException('An account with this email address already exists. Please sign in instead.');
    }

    const otp = this.generate6DigitOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    let customerUser: User;

    if (existing && !existing.isEmailVerified) {
      // Update existing unverified record with new details and fresh OTP
      customerUser = await this.usersService.update(existing.id, {
        fullName: dto.fullName.trim(),
        phoneNumber: dto.phoneNumber.trim(),
        passwordHash: hashedPassword,
        emailOtp: otp,
        emailOtpExpiresAt: expiresAt,
        otpAttempts: 0,
      });
      this.logger.log(`Refreshed unverified account with fresh OTP for: ${customerUser.email}`);
    } else {
      // Create new customer account in unverified status
      customerUser = await this.usersService.create({
        fullName: dto.fullName,
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        passwordHash: hashedPassword,
        role: UserRole.CUSTOMER,
        isEmailVerified: false,
        emailOtp: otp,
        emailOtpExpiresAt: expiresAt,
        otpAttempts: 0,
      });
      this.logger.log(`Created new customer awaiting OTP verification: ${customerUser.email}`);
    }

    // Dispatch verification email via Resend
    await this.mailService.sendVerificationOtp(customerUser.email, customerUser.fullName, otp);

    return {
      requiresVerification: true,
      email: customerUser.email,
      message: `A 6-digit verification code has been dispatched to ${customerUser.email}. Please verify to activate your account.`,
    };
  }

  async verifyOtp(dto: VerifyOtpDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('No account found for this email address.');
    }

    if (user.isEmailVerified) {
      return this.createAuthResponse(user);
    }

    // Check failed attempts
    if (user.otpAttempts >= 5) {
      throw new BadRequestException(
        'Too many invalid attempts. For your security, this code is locked. Please click "Resend Code" to receive a new one.'
      );
    }

    // Check expiration
    if (user.emailOtpExpiresAt && user.emailOtpExpiresAt < new Date()) {
      throw new BadRequestException('Verification code has expired. Please request a new code.');
    }

    // Verify code match
    if (!user.emailOtp || user.emailOtp.trim() !== dto.otp.trim()) {
      await this.usersService.update(user.id, {
        otpAttempts: user.otpAttempts + 1,
      });
      const remaining = 5 - (user.otpAttempts + 1);
      throw new BadRequestException(
        `Invalid verification code. (${remaining} attempt${remaining === 1 ? '' : 's'} remaining)`
      );
    }

    // Success: activate user account
    const verifiedUser = await this.usersService.update(user.id, {
      isEmailVerified: true,
      emailOtp: null,
      emailOtpExpiresAt: null,
      otpAttempts: 0,
    });

    this.logger.log(`🎉 Customer account successfully verified: ${verifiedUser.email}`);
    return this.createAuthResponse(verifiedUser);
  }

  async resendOtp(dto: ResendOtpDto): Promise<{ success: boolean; message: string }> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('No account found for this email address.');
    }

    if (user.isEmailVerified) {
      return {
        success: true,
        message: 'Your email address is already verified. You may log in directly.',
      };
    }

    const otp = this.generate6DigitOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await this.usersService.update(user.id, {
      emailOtp: otp,
      emailOtpExpiresAt: expiresAt,
      otpAttempts: 0,
    });

    await this.mailService.sendVerificationOtp(user.email, user.fullName, otp);

    return {
      success: true,
      message: `A fresh 6-digit verification code has been dispatched to ${user.email}.`,
    };
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<{ success: boolean; message: string }> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      // Don't disclose user non-existence for security
      return {
        success: true,
        message: `If an account exists for ${dto.email}, a 6-digit password reset code has been sent.`,
      };
    }

    const otp = this.generate6DigitOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await this.usersService.update(user.id, {
      emailOtp: otp,
      emailOtpExpiresAt: expiresAt,
      otpAttempts: 0,
    });

    await this.mailService.sendPasswordResetOtp(user.email, user.fullName, otp);

    this.logger.log(`📧 Password reset OTP sent to: ${user.email}`);
    return {
      success: true,
      message: `A 6-digit password reset code has been dispatched to ${user.email}.`,
    };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<{ success: boolean; message: string }> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('No account found for this email address.');
    }

    if (user.otpAttempts >= 5) {
      throw new BadRequestException('Too many invalid attempts. Please request a new reset code.');
    }

    if (!user.emailOtp || !user.emailOtpExpiresAt || new Date() > user.emailOtpExpiresAt) {
      throw new BadRequestException('Password reset code has expired. Please request a new one.');
    }

    if (user.emailOtp !== dto.otp.trim()) {
      await this.usersService.update(user.id, {
        otpAttempts: user.otpAttempts + 1,
      });
      const remaining = 5 - (user.otpAttempts + 1);
      throw new BadRequestException(
        `Invalid reset code. (${remaining} attempt${remaining === 1 ? '' : 's'} remaining)`
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await this.usersService.update(user.id, {
      passwordHash: hashedPassword,
      emailOtp: null,
      emailOtpExpiresAt: null,
      otpAttempts: 0,
      isEmailVerified: true,
    });

    this.logger.log(`🔐 Password successfully reset for: ${user.email}`);
    return {
      success: true,
      message: 'Your password has been successfully reset! You can now log in with your new password.',
    };
  }

  async googleLogin(dto: GoogleLoginDto): Promise<AuthResponseDto> {
    const googleClientId =
      this.configService.get<string>('GOOGLE_CLIENT_ID') || process.env.GOOGLE_CLIENT_ID;

    let payload: any;
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: dto.credential,
        audience: googleClientId,
      });
      payload = ticket.getPayload();
    } catch (err: any) {
      this.logger.error(`Google token verification failed: ${err?.message}`);
      throw new UnauthorizedException('Invalid or expired Google authentication token');
    }

    if (!payload || !payload.email) {
      throw new UnauthorizedException('Google account does not contain a verified email address');
    }

    const email = payload.email.toLowerCase().trim();
    const fullName = payload.name || payload.given_name || 'Google User';
    const googleId = payload.sub;
    const avatarUrl = payload.picture || null;

    let user = await this.usersService.findByGoogleId(googleId);
    if (!user) {
      user = await this.usersService.findByEmail(email);
    }

    if (user) {
      // User exists. Update googleId and avatar if not set, and mark email verified
      if (!user.googleId || !user.avatarUrl || !user.isEmailVerified) {
        user = await this.usersService.update(user.id, {
          googleId: user.googleId || googleId,
          avatarUrl: user.avatarUrl || avatarUrl,
          isEmailVerified: true,
        });
      }
      this.logger.log(`🎉 Google login success for existing user: ${user.email} (${user.role})`);
    } else {
      // New user registration via Google OAuth
      user = await this.usersService.create({
        fullName,
        email,
        googleId,
        avatarUrl,
        isEmailVerified: true,
        role: UserRole.CUSTOMER,
      });
      this.logger.log(`✨ Created new customer account via Google OAuth: ${user.email}`);
    }

    return this.createAuthResponse(user);
  }

  async validateToken(token: string): Promise<User> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User no longer exists');
      }
      return user;
    } catch {
      throw new UnauthorizedException('Invalid or expired authentication session');
    }
  }

  private generate6DigitOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private createAuthResponse(user: User): AuthResponseDto {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        role: user.role as any,
        avatarUrl: user.avatarUrl,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt.toISOString(),
      },
    };
  }
}
