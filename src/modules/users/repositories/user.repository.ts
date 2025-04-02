import { Injectable, Inject } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async findByUsername(name: string): Promise<User | null> {
    return this.findOne({ where: { name } });
  }

  // Find users by role name
  async findByRoleName(roleName: string): Promise<User[]> {
    return this.createQueryBuilder('user')
      .where(`FIND_IN_SET(:roleName, user.roles) > 0`, { roleName }) 
      .getMany();
  }
}

