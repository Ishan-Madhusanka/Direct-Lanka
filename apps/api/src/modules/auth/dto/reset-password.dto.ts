import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';
import { ResetPasswordRequest } from '@lankadirect/contracts';

export class ResetPasswordDto implements ResetPasswordRequest {
  @ApiProperty({ example: 'kasun.perera@gmail.lk', description: 'User account email' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ example: '123456', description: '6-digit OTP verification code' })
  @IsString()
  @Length(6, 6, { message: 'Verification code must be exactly 6 digits' })
  @IsNotEmpty({ message: 'OTP is required' })
  otp: string;

  @ApiProperty({ example: 'newSecurePass123', description: 'New account password' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters in length' })
  @IsNotEmpty({ message: 'New password is required' })
  newPassword: string;
}
