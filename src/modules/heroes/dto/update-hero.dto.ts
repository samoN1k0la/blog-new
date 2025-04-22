import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateHeroDto {
  @ApiProperty({
    description: "Hero title",
    example: 'Updated Hero Title',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Hero cover image file'
  })
  @IsOptional()
  coverImage?: Express.Multer.File;
}

