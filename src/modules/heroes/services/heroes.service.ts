import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HeroRepository } from '../repositories/hero.repository';
import { Hero } from '../entities/hero.entity';
import { File } from '../../posts/entities/file.entity';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { FilterQueryDto } from '../../../common/dto/filter-query.dto';

@Injectable()
export class HeroesService {
  constructor(
    @InjectRepository(HeroRepository)
    private readonly heroRepository: HeroRepository
  ) {}

  async createHero(createHeroDto: CreateHeroDto, file?: Express.Multer.File): Promise<Hero> {
    const hero = new Hero();
    hero.title = createHeroDto.title;

    if (file) {
      hero.coverImage = this.createFileEntity(file);
    }

    return this.heroRepository.save(hero);
  }

  async getAllHeroes(
    query: PaginationQueryDto,
    filters: FilterQueryDto
  ): Promise<{ data: Hero[]; meta: any }> {
    return this.heroRepository.findWithPagination(query, filters);
  }

  async getHero(id: string): Promise<Hero> {
    const hero = await this.heroRepository.findOne({
      where: { id },
      relations: ['coverImage'],
    });

    if (!hero) {
      throw new NotFoundException(`Hero with ID ${id} not found`);
    }

    return hero;
  }

  async updateHero(id: string, updateHeroDto: UpdateHeroDto, file?: Express.Multer.File): Promise<Hero> {
    const hero = await this.getHero(id);
    hero.title = updateHeroDto.title ?? hero.title;

    if (file) {
      hero.coverImage = this.createFileEntity(file);
    }

    return this.heroRepository.save(hero);
  }

  async removeHero(id: string): Promise<void> {
    const hero = await this.getHero(id);
    await this.heroRepository.remove(hero);
  }

  private createFileEntity(file: Express.Multer.File): File {
    const fileEntity = new File();
    fileEntity.filename = file.filename;
    fileEntity.path = file.path;
    fileEntity.url = `/uploads/${file.filename}`;
    fileEntity.type = file.mimetype;
    return fileEntity;
  }
}

