import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class Hero extends BaseEntity {
  @ManyToOne(() => Post, { nullable: false })
  post: Post;
}

