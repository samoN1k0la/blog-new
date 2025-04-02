import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Category } from '../../categories/entities/category.entity';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsEnum(['draft', 'pending', 'published'])
  @IsOptional()
  status?: string;

  /*
  @IsOptional()
  category?: Category;*/
}

