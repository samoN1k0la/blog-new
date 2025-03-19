import { 
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {

  @Get()
  @ApiOperation({ summary: 'Get all categories', description: 'Returns a list of all categories available for posts.' })
  async getCategories() {}

  @Post()
  @ApiOperation({ summary: 'Create a new category (Admin-only)', description: 'Allows an admin to add a new category.' })
  async addCategory() {}

  @Patch(':id')
  @ApiOperation({ summary: 'Edit a category (Admin-only)', description: 'Enables an admin to update the name or description of a category.' })
  async editCategory(@Param('id') id: string) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category (Admin-only)', description: 'Allows an admin to remove a category.' })
  async deleteCategory(@Param('id') id: string) {}

}
