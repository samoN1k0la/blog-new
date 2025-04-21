import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Category } from '../../categories/entities/category.entity';
import { PostStatus } from '../enums/post-status.enum';

export class CreatePostDto {
  @ApiProperty({
    description: "Main title of the post",
    example: 'Post title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "Post content",
    example: 'This is the content of the post',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: "Post status (draft, pending or published)",
    example: PostStatus.DRAFT,
    enum: PostStatus,
    enumName: 'PostStatus'
  })
  @IsEnum(PostStatus)
  @IsOptional()
  status: PostStatus = PostStatus.DRAFT; 

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Post cover image file'
  })
  @IsOptional()
  coverImage?: Express.Multer.File;
}

