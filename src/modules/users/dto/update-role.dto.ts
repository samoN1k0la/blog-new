import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class UpdateRoleDto {
  @ApiProperty({
    description: "New roles array",
    example: [UserRole.Editor, UserRole.Reviewer],
    enum: UserRole,
    isArray: true,
    enumName: 'UserRole'
  })
  @IsArray()
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];
}

