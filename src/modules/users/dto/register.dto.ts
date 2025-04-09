import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: "User's full name",
    example: 'John Doe',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: "User's email address",
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User's password (min 8 chars, 1 uppercase, 1 number)",
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

