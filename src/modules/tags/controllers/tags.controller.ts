import { 
  Controller,
  Get,
  Post,
  Delete,
  Param
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {

  @Get()
  @ApiOperation({ summary: 'Get all tags', description: 'Retrieves a list of all available tags.' })
  async getTags() {}

  @Post()
  @ApiOperation({ summary: 'Create a new tag (Editor or Admin)', description: 'Allows an editor or admin to create a new tag for organizing posts.' })
  async createTag() {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tag (Admin or Editor that created the tag)', description: 'Enables the creator of a tag (or an admin) to delete it.' })
  async deleteTag(@Param('id') id: string) {}

}
