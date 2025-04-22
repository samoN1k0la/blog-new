import { Inject, Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Hero } from '../entities/hero.entity';
import { PaginatedResponse } from '../../../common/interfaces/paginated-response.interface';

@Injectable()
export class HeroRepository extends Repository<Hero> {
  constructor(
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
  ) {
    super(Hero, dataSource.createEntityManager());
  }

  async findWithPagination(query: any): Promise<PaginatedResponse<Hero>> {
    const [data, total] = await this.findAndCount({
      relations: ['coverImage'],
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return {
      data,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      }
    };
  }
}
