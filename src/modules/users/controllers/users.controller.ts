import { 
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { PaginatedResponse } from '../../../common/interfaces/paginated-response.interface';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all users (Admin-only)', description: 'Fetches a list of all registered users in the system. Only accessible by admins.' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async getUsers(@Query() query: PaginationQueryDto): Promise<PaginatedResponse<User>> {
    return this.usersService.getUsers(query);
  }

  @Get('reviewer')
  @ApiOperation({ summary: 'List all reviewers (Admin-only)', description: 'Returns a list of users who have the reviewer role.' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async getReviewers(@Query() query: PaginationQueryDto): Promise<PaginatedResponse<User>> {
    return this.usersService.getReviewers(query);
  }

  @Get('editor')
  @ApiOperation({ summary: 'List all editors', description: 'Retrieves a list of users who hold the editor role.' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async getEditors(@Query() query: PaginationQueryDto): Promise<PaginatedResponse<User>> {
    return this.usersService.getEditors(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user details by ID', description: 'Retrieves detailed information about a specific user based on their unique ID.' }) 
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.usersService.getUser(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user profile', description: 'Allows a user to update their profile information, including name, email, and other personal details.' })
  async updateUserInfo(@Param('id') id: string, @Body() updateData: UpdateUserDto): Promise<User | null> {
    return this.usersService.updateUserInfo(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user account (Admin-only)', description: 'Permanently deletes a user account. Only admins have permission to perform this action.' })
  async deleteUser(@Param('id') id: string): Promise<{ status: string; message: string }> {
    return this.usersService.deleteUser(id);
  }

  @Patch('role/:id')
  @ApiOperation({ summary: 'Update user role (Admin-only or Anyone if changing to Editor profile)', description: 'Changes the role of a user, allowing the admin to promote or demote users. Additionally, it allows normal users to become editors' })
  async updateUserRole(@Param('id') id: string, @Body() body: UpdateRoleDto): Promise<User | null> {
    console.log(body.roles);
    return this.usersService.updateUserRole(id, body.roles);
  }
}

