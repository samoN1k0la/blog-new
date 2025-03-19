import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private readonly dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async findByPost(postId: string): Promise<Comment[]> {
    return this.find({ where: { post: { id: postId } }, relations: ['post', 'author'] });
  }
}

