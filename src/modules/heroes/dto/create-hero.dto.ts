import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateHeroDto {
  @ApiProperty({
    description: "Hero title",
    example: 'Featured Hero',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Hero cover image file'
  })
  @IsOptional()
  coverImage?: Express.Multer.File;
}

