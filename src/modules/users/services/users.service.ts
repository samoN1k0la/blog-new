import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { DeleteResult, ILike } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { PaginatedResponse } from '../../../common/interfaces/paginated-response.interface';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { FilterQueryDto } from '../../../common/dto/filter-query.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async getUsers(
    query: PaginationQueryDto,
    filters: FilterQueryDto
  ): Promise<PaginatedResponse<User>> {
    const findOptions = {
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    } as any;

    if (filters.searchQuery) {
      const search = `%${filters.searchQuery}%`;
      findOptions.where = [
        { name: ILike(search) },
        { email: ILike(search) },
      ];
    }

    const [users, total] = await this.userRepository.findAndCount(findOptions);

    return {
      data: users,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      }
    };
  } 

  async getAdmins(
    query: PaginationQueryDto,
    filters: FilterQueryDto
  ): Promise<PaginatedResponse<User>> {
    return this.userRepository.findByRoleNameWithPagination('ADMIN', query, filters);
  } 

  async getReviewers(
    query: PaginationQueryDto,
    filters: FilterQueryDto
  ): Promise<PaginatedResponse<User>> {
    return this.userRepository.findByRoleNameWithPagination('REVIEWER', query, filters);
  }

  async getEditors(
    query: PaginationQueryDto,
    filters: FilterQueryDto
  ): Promise<PaginatedResponse<User>> {
    return this.userRepository.findByRoleNameWithPagination('EDITOR', query, filters);
  }

  async getUser(id: string): Promise<User | null> {
    const user = this.userRepository.findOne({ 
      where: { id },
      relations: ['posts', 'comments', 'likes', 'notifications'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async updateUserInfo(id: string, updateData: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, updateData);
    return this.getUser(id);
  }

  async deleteUser(id: string): Promise<{ status: string; message: string }> {
    const result: DeleteResult = await this.userRepository.delete(id);

    if (result.affected && result.affected > 0) {
      return { status: 'success', message: 'User successfully deleted' };
    } else {
      return { status: 'error', message: 'User not found or already deleted' };
    }
  }

  async updateUserRole(id: string, roles: UserRole[]): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) 
      throw new Error('User not found');

    user.roles = roles;
    return this.userRepository.save(user);
  }
}

