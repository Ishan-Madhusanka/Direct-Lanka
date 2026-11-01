import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { GoogleLoginRequest } from '@lankadirect/contracts';

export class GoogleLoginDto implements GoogleLoginRequest {
  @ApiProperty({
    description: 'Google Identity Services JWT credential (ID token) received from Google sign-in prompt',
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ij...',
  })
  @IsString()
  @IsNotEmpty({ message: 'Google credential token is required' })
  credential: string;
}

