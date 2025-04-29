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
import { FilterQueryDto } from '../../../common/dto/filter-query.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  async getUsers(
    @Query() query: PaginationQueryDto,
    @Query() filters: FilterQueryDto
  ): Promise<PaginatedResponse<User>> {
    return this.usersService.getUsers(query, filters);
  }
  
  @Get('admins')
  @ApiOperation({ summary: 'List all admins' })
  async getAdmins(
    @Query() query: PaginationQueryDto,
    @Query() filters: FilterQueryDto
  ): Promise<PaginatedResponse<User>> {
    return this.usersService.getAdmins(query, filters);
  } 

  @Get('reviewers')
  @ApiOperation({ summary: 'List all reviewers' })
  async getReviewers(
    @Query() query: PaginationQueryDto,
    @Query() filters: FilterQueryDto
  ): Promise<PaginatedResponse<User>> {
    return this.usersService.getReviewers(query, filters);
  }

  @Get('editors')
  @ApiOperation({ summary: 'List all editors' })
  async getEditors(
    @Query() query: PaginationQueryDto,
    @Query() filters: FilterQueryDto
  ): Promise<PaginatedResponse<User>> {
    return this.usersService.getEditors(query, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user details by ID' }) 
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.usersService.getUser(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user profile' })
  async updateUserInfo(@Param('id') id: string, @Body() updateData: UpdateUserDto): Promise<User | null> {
    return this.usersService.updateUserInfo(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user account' })
  async deleteUser(@Param('id') id: string): Promise<{ status: string; message: string }> {
    return this.usersService.deleteUser(id);
  }

  @Patch('role/:id')
  @ApiOperation({ summary: 'Update user role' })
  async updateUserRole(@Param('id') id: string, @Body() body: UpdateRoleDto): Promise<User | null> {
    console.log(body.roles);
    return this.usersService.updateUserRole(id, body.roles);
  }
}

