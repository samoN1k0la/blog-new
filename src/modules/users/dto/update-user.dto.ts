import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ 
    description: "Updated name",
    example: 'Jane Smith',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ 
    description: "Updated email",
    example: 'jane.smith@example.com',
    required: false
  })
  @IsEmail()
  @IsOptional()
  email?: string;
}

