import { 
  Controller,
  Get,
  Post,
  Delete,
  Param
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {

  @Get('post/:id')
  @ApiOperation({ summary: 'Get like count for a post', description: 'Returns the total number of likes on a specific post.' })
  async getLikeCountForPost(@Param('id') id: string) {}

  @Post('post/:id')
  @ApiOperation({ summary: 'Like a post', description: 'Allows a user to like a post.' })
  async likePost(@Param('id') id: string) {}

  @Delete('post/:id')
  @ApiOperation({ summary: 'Unlike a post', description: 'Allows a user to remove their like from a post.' })
  async unlikePost(@Param('id') id: string) {}

  @Get('comment/:id')
  @ApiOperation({ summary: 'Get like count for a comment', description: 'Returns the total number of likes on a specific comment.' })
  async getLikeCountForComment(@Param('id') id: string) {}

  @Post('comment/:id')
  @ApiOperation({ summary: 'Like a comment', description: 'Allows a user to like a comment.' })
  async likeComment(@Param('id') id: string) {}

  @Delete('comment/:id')
  @ApiOperation({ summary: 'Unlike a comment', description: 'Enables a user to remove their like from a comment.' })
  async unlikeComment(@Param('id') id: string) {} 

}
