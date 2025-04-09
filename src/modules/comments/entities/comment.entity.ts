import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
import { Like } from '../../likes/entities/like.entity';

@Entity()
export class Comment extends BaseEntity {
  @Column('text')
  content: string;

  
  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  author: User;

  /*@ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Post;

  @OneToMany(() => Like, (like) => like.comment)
  likes: Like[];*/
}

