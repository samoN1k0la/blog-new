import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Post } from './post.entity';

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
  
  @OneToOne(() => Post, (post: any) => post.coverImage, { onDelete: 'CASCADE' })
  post?: Post;
}

