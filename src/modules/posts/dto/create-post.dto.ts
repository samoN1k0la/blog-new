import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Category } from '../../categories/entities/category.entity';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(['draft', 'pending', 'published'])
  @IsOptional()
  status?: string = 'draft';

  @IsOptional()
  category?: Category;
}

