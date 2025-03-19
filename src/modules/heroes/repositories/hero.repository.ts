import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Hero } from '../entities/hero.entity';

@Injectable()
export class HeroRepository extends Repository<Hero> {
  constructor(private readonly dataSource: DataSource) {
    super(Hero, dataSource.createEntityManager());
  }
}

