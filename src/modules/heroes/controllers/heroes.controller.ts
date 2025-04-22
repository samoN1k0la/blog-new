import { 
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { HeroesService } from '../services/heroes.service';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginatedResponse } from '../../../common/interfaces/paginated-response.interface';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { Hero } from '../entities/hero.entity';

@ApiTags('Heroes')
@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all heroes' })
  async getAllHeroes(@Query() query: PaginationQueryDto): Promise<PaginatedResponse<Hero>> {
    return this.heroesService.getAllHeroes(query);
  }

  @Get(':heroId')
  @ApiOperation({ summary: 'Get a hero' })
  async getHero(@Param('heroId') heroId: string) {
    return this.heroesService.getHero(heroId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a hero' })
  @UseInterceptors(FileInterceptor('coverImage'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        coverImage: { type: 'string', format: 'binary' },
      },
    },
  })
  async createHero(
    @Body() createHeroDto: CreateHeroDto,
    @UploadedFile() coverImage?: Express.Multer.File
  ) {
    return this.heroesService.createHero(createHeroDto, coverImage);
  }

  @Put(':heroId')
  @ApiOperation({ summary: 'Update a hero' })
  @UseInterceptors(FileInterceptor('coverImage'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        coverImage: { type: 'string', format: 'binary' },
      },
    },
  })
  async updateHero(
    @Param('heroId') heroId: string,
    @Body() updateHeroDto: UpdateHeroDto,
    @UploadedFile() coverImage?: Express.Multer.File
  ) {
    return this.heroesService.updateHero(heroId, updateHeroDto, coverImage);
  }

  @Delete(':heroId')
  @ApiOperation({ summary: 'Remove a hero' })
  async removeHero(
    @Param('heroId') heroId: string
  ): Promise<{ status: string; message: string }> {
    await this.heroesService.removeHero(heroId);
    return {
      status: 'success',
      message: 'Hero successfully deleted'
    }; 
  }
}

