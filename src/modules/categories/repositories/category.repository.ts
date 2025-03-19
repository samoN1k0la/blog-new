import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private readonly dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async findByName(name: string): Promise<Category | null> {
    return this.findOne({ where: { name } });
  }
}

