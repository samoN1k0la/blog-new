import { Injectable, Inject } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { PaginatedResponse } from '../../../common/interfaces/paginated-response.interface';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { FilterQueryDto } from '../../../common/dto/filter-query.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async findByUsername(name: string): Promise<User | null> {
    return this.findOne({ where: { name } });
  }

  async findByRoleNameWithPagination(
    roleName: string,
    pagination: PaginationQueryDto,
    filters: FilterQueryDto
  ): Promise<PaginatedResponse<User>> {
    const queryBuilder = this.createQueryBuilder('user')
      .where('FIND_IN_SET(:roleName, user.roles) > 0', { roleName });

    if (filters.searchQuery) {
      queryBuilder.andWhere(
        '(user.name LIKE :search OR ' + 
        'user.email LIKE :search)',
        { search: `%${filters.searchQuery}%` }
      );
    }

    const [users, total] = await queryBuilder
      .skip((pagination.page - 1) * pagination.limit)
      .take(pagination.limit)
      .getManyAndCount();

    return {
      data: users,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        totalPages: Math.ceil(total / pagination.limit),
      }
    };
  } 
}

