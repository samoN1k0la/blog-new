import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class File extends BaseEntity {
  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  url: string;

  @Column()
  type: string;

  @ManyToOne(() => Post, (post) => post.files)
  post: Post;
}

