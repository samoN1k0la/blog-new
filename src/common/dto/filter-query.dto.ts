import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterQueryDto {
  @ApiPropertyOptional({ 
    name: 'searchQuery',
    required: false,
    description: 'Search query'
  })
  @IsOptional()
  @IsString()
  searchQuery: string = "";
}

