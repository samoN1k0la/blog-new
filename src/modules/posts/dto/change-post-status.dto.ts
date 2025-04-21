import { ApiProperty } from '@nestjs/swagger';
import { PostStatus } from '../enums/post-status.enum';
import { IsEnum } from 'class-validator'; 

export class ChangePostStatusDto {
  @ApiProperty({
    enum: PostStatus,
    enumName: 'PostStatus',
    example: PostStatus.DRAFT,
    description: 'Post status'
  })
  @IsEnum(PostStatus)
  status: PostStatus;
}
