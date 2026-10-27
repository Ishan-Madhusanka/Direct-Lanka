import { ApiProperty } from '@nestjs/swagger';
import { AuthResponse, UserContract, UserRole } from '@lankadirect/contracts';

export class UserDto implements UserContract {
  @ApiProperty({ example: 'clx123456789' })
  id: string;

  @ApiProperty({ example: 'kasun.perera@gmail.lk' })
  email: string;

  @ApiProperty({ example: 'Kasun Perera' })
  fullName: string;

  @ApiProperty({ example: '077 123 4567', nullable: true })
  phoneNumber?: string | null;

  @ApiProperty({ enum: ['CUSTOMER', 'ADMIN'], example: 'CUSTOMER' })
  role: UserRole;

  @ApiProperty({ example: '2026-10-28T00:00:00.000Z' })
  createdAt: string;
}

export class AuthResponseDto implements AuthResponse {
  @ApiProperty({ description: 'JWT Access Bearer Token' })
  accessToken: string;

  @ApiProperty({ type: UserDto })
  user: UserDto;
}
