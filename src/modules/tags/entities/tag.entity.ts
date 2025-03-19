import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity()
export class Tag extends BaseEntity {
  @Column({ unique: true })
  name: string;
}
