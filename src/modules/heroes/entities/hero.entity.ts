import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class Hero extends BaseEntity {

  @ManyToOne(() => Post, { nullable: false })
  post: Post;

  @Column({ type: 'boolean', default: true })
  isFeatured: boolean;

  @Column({ type: 'timestamp', nullable: true })
  featuredAt: Date;
}


