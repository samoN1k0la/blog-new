import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: "User's registered email",
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User's password",
    example: 'SecurePassword123!',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {
    message: 'Password too weak',
  })
  password: string;
}

