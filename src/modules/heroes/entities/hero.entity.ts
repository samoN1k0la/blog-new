import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { File } from '../../posts/entities/file.entity';

@Entity()
export class Hero extends BaseEntity {
  @Column()
  title: string;

  @OneToOne(() => File, { nullable: true, cascade: true })
  @JoinColumn()
  coverImage?: File;
}

