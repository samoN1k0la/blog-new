import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Category } from '../../categories/entities/category.entity';
import { PostStatus } from '../enums/post-status.enum';

export class UpdatePostDto {
  @ApiProperty({
    description: "Main title of the post",
    example: 'Post title',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: "Post content",
    example: 'This is the content of the post',
  })
  @IsString()
  @IsOptional()
  content: string;

  @ApiProperty({
    description: "Post status (draft, pending or published)",
    example: PostStatus.DRAFT,
    enum: PostStatus,
    enumName: 'PostStatus'
  })
  @IsEnum(PostStatus)
  @IsOptional()
  status?: PostStatus = PostStatus.DRAFT;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Post cover image file'
  })
  @IsOptional()
  coverImage?: Express.Multer.File;
}

