import { 
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param 
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {

  @Get(':postId')
  @ApiOperation({ summary: 'Get all comments for a post', description: 'Retrieves a list of comments associated with a particular post.' })
  async getAllCommentsByPostId(@Param('postId') postId: string) {}

  @Post(':postId')
  @ApiOperation({ summary: 'Add a comment', description: 'Allows a user to post a comment on a specific post.' })
  async addComment(@Param('postId') postId: string) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Edit a comment (Author-only)', description: 'Allows the author of a comment to edit its content.' })
  async editComment(@Param('id') id: string) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment (Author, Reviewer or Admin)', description: 'Enables the author, reviewer, or admin to remove a comment from a post.' })
  async deleteComment(@Param('id') id: string) {}

}
