import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: "User's current password",
    example: 'OldSecurePassword123!',
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    description: "User's new password",
    example: 'NewSecurePassword456!',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {
    message: 'Password too weak',
  })
  newPassword: string;
}

