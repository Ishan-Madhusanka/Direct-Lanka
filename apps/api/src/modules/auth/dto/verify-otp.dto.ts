import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { VerifyOtpRequest } from '@lankadirect/contracts';

export class VerifyOtpDto implements VerifyOtpRequest {
  @ApiProperty({ example: 'kasun.perera@gmail.com', description: 'Registered customer email' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ example: '749201', description: '6-digit OTP code dispatched to email' })
  @IsString()
  @IsNotEmpty({ message: 'OTP is required' })
  @Length(6, 6, { message: 'OTP must be exactly 6 digits' })
  otp: string;
}
