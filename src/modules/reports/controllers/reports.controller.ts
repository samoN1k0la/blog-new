import { 
  Controller,
  Get,
  Post,
  Patch,
  Param
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {

  @Get('post')
  @ApiOperation({ summary: 'Get all reported posts (Reviewer or Admin)', description: 'Retrieves a list of posts that have been reported for review.' })
  async getReportedPosts() {}

  @Get('comment')
  @ApiOperation({ summary: 'Get all reported comments (Reviewer or Admin)', description: 'Returns a list of comments that have been flagged for review.' })
  async getReportedComments() {}

  @Post('post/:id')
  @ApiOperation({ summary: 'Report a post', description: 'Allows users to report inappropriate or misleading posts.' })
  async reportPost(@Param('id') id: string) {}

  @Post('comment/:id')
  @ApiOperation({ summary: 'Report a comment', description: 'Allows users to report inappropriate or offensive comments.' })
  async reportComment(@Param('id') id: string) {}

  @Patch('resolve/:id')
  @ApiOperation({ summary: 'Mark a report as resolved (Reviewer or Admin)', description: 'Allows a reviewer or admin to resolve and close a reported case.' })
  async resolveReport(@Param('id') id: string) {}

}
