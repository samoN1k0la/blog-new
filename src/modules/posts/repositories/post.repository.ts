import { Inject, Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Post } from '../entities/post.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
  ) {
    super(Post, dataSource.createEntityManager());
  } 

  async createPost(title: string, content: string, user: User): Promise<Post> {
    const insertResult = await this.insert({
      title,
      content,
      author: user,
    });

    console.log(user);

    const newPost = await this.findOne({
      where: { id: insertResult.identifiers[0].id },
      relations: ['author'],
    });

    if (!newPost) {
      throw new Error("Post creation failed");
    }

    return newPost; 
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

