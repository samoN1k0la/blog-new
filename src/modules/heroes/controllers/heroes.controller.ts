import { 
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Heroes')
@Controller('heroes')
export class HeroesController {

  @Get()
  @ApiOperation({ summary: 'Get all featured posts', description: 'Retrieves a list of all featured posts.' })
  async getAllHeroes() {}

  @Get(':heroId')
  @ApiOperation({ summary: 'Get a specific featured post', description: 'Retrieves a specific featured post by ID.' })
  async getHero(@Param('heroId') heroId: string) {}

  @Post()
  @ApiOperation({ summary: 'Create a featured post', description: 'Allows the creation of a new featured post.' })
  async createHero(@Body() createHeroDto: any /* will change later */) {}

  @Put(':heroId')
  @ApiOperation({ summary: 'Update a featured post', description: 'Updates a specific featured post by ID.' })
  async updateHero(
    @Param('heroId') heroId: string, 
    @Body() updateHeroDto: any /* will change to actual DTO */
  ) {}

  @Delete(':heroId')
  @ApiOperation({ summary: 'Remove a featured post', description: 'Removes a specific featured post by ID.' })
  async removeHero(@Param('heroId') heroId: string) {}
}

