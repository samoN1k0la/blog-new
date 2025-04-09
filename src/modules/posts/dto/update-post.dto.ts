import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Category } from '../../categories/entities/category.entity';

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
  content?: string;

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

