import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { File } from './file.entity';

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ default: 'draft' }) // Can be 'draft', 'pending', 'published'
  status: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  author: User; 

  @OneToOne(() => File, { nullable: true, cascade: true })
  @JoinColumn()
  coverImage?: File;
}

