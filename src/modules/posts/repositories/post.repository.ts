import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(private readonly dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async findByAuthor(userId: string): Promise<Post[]> {
    return this.find({ where: { author: { id: userId } }, relations: ['author'] });
  }

  async findRecent(limit: number): Promise<Post[]> {
    return this.createQueryBuilder('post')
      .orderBy('post.createdAt', 'DESC')
      .take(limit)
      .getMany();
  }
}

