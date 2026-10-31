import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ResendOtpRequest } from '@lankadirect/contracts';

export class ResendOtpDto implements ResendOtpRequest {
  @ApiProperty({ example: 'kasun.perera@gmail.com', description: 'Registered customer email' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}
