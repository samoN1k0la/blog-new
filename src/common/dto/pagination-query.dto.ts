import { IsInt, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiPropertyOptional({ 
    name: 'page',
    required: false,
    example: 1,
    default: 1,
    description: 'Page number for pagination'
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    name: 'limit', 
    required: false,
    example: 10,
    default: 10,
    description: 'Number of items per page'
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number = 10;
}


