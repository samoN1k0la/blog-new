import { 
  Controller,
  Get,
  Post,
  Delete,
  Param
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Heroes')
@Controller('heroes')
export class HeroesController {

  @Get()
  @ApiOperation({ summary: 'Get featured posts', description: 'Retrieves a list of posts that have been featured.' })
  async getHeroes() {}

  @Post(':postId')
  @ApiOperation({ summary: 'Feature a post (Admin-only)', description: 'Allows an admin to mark a post as featured.' })
  async featurePost(@Param('postId') id: string) {}

  @Delete(':postId')
  @ApiOperation({ summary: 'Remove a post from featured (Admin-only)', description: 'Enables an admin to remove a post from the featured list.' })
  async removeHero(@Param('postId') id: string) {}

}
