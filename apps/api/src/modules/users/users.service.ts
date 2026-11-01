import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserRole, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    // Seed default admin if not present
    await this.seedDefaultAdmin();
  }

  private async seedDefaultAdmin() {
    try {
      const adminEmail = 'admin@lankadirect.lk';
      const existingAdmin = await this.prisma.user.findUnique({
        where: { email: adminEmail },
      });

      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await this.prisma.user.create({
          data: {
            email: adminEmail,
            fullName: 'LankaDirect SuperAdmin',
            phoneNumber: '+94 11 234 5678',
            role: UserRole.ADMIN,
            passwordHash: hashedPassword,
            isEmailVerified: true,
          },
        });
        this.logger.log('Default admin seeded in PostgreSQL (admin@lankadirect.lk)');
      }
    } catch (err: any) {
      this.logger.warn('Admin seed skipped or pending migration: ' + err?.message);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { googleId },
    });
  }

  async create(data: {
    fullName: string;
    email: string;
    phoneNumber?: string;
    passwordHash?: string | null;
    role?: UserRole;
    isEmailVerified?: boolean;
    googleId?: string | null;
    avatarUrl?: string | null;
    emailOtp?: string | null;
    emailOtpExpiresAt?: Date | null;
    otpAttempts?: number;
  }): Promise<User> {
    return this.prisma.user.create({
      data: {
        fullName: data.fullName.trim(),
        email: data.email.toLowerCase().trim(),
        phoneNumber: data.phoneNumber ? data.phoneNumber.trim() : null,
        passwordHash: data.passwordHash || null,
        role: data.role || UserRole.CUSTOMER,
        isEmailVerified: data.isEmailVerified || false,
        googleId: data.googleId || null,
        avatarUrl: data.avatarUrl || null,
        emailOtp: data.emailOtp,
        emailOtpExpiresAt: data.emailOtpExpiresAt,
        otpAttempts: data.otpAttempts || 0,
      },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
