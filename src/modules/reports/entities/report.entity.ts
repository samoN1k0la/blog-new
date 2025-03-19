import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class Report extends BaseEntity {
  @Column({ type: 'text' })
  reason: string;

  @Column({ default: false })
  resolved: boolean;

  @ManyToOne(() => User, { eager: true })
  reportedBy: User;

  @ManyToOne(() => Post, { nullable: true })
  post: Post;

  @ManyToOne(() => Comment, { nullable: true })
  comment: Comment;
}

