import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Category } from '../../categories/entities/category.entity';

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
    example: 'draft',
  })
  @IsEnum(['draft', 'pending', 'published'])
  @IsOptional()
  status?: string = 'draft';

  /*
  @IsOptional()
  category?: Category;*/
}

