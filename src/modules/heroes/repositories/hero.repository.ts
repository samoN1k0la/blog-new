import { Inject, Injectable } from '@nestjs/common';
import { Repository, DataSource, ILike } from 'typeorm';
import { Hero } from '../entities/hero.entity';
import { PaginatedResponse } from '../../../common/interfaces/paginated-response.interface';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { FilterQueryDto } from '../../../common/dto/filter-query.dto';

@Injectable()
export class HeroRepository extends Repository<Hero> {
  constructor(
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
  ) {
    super(Hero, dataSource.createEntityManager());
  }

  async findWithPagination(
    query: PaginationQueryDto,
    filters: FilterQueryDto
  ): Promise<PaginatedResponse<Hero>> {
    const findOptions = {
      relations: ['coverImage'],
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    } as any;

    if (filters.searchQuery) {
      const search = `%${filters.searchQuery}%`;
      findOptions.where = [
        { title: ILike(search) },
      ];
    }

    const [data, total] = await this.findAndCount(findOptions);

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
