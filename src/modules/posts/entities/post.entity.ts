import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { File } from './file.entity';
import { PostStatus } from '../enums/post-status.enum'; 

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.DRAFT
  })
  status: PostStatus;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  author: User; 

  @OneToOne(() => File, { nullable: true, cascade: true })
  @JoinColumn()
  coverImage?: File;
}

