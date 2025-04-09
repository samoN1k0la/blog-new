import { Injectable, Inject } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthRepository extends Repository<User> {
  constructor(
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async createUser(email: string, password: string, name: string): Promise<User> {
    const user = this.create({ 
      email, 
      password, 
      name,
      roles: [],
    });
    return this.save(user);
  }

  async gatherInfo(email: string): Promise<User | null> {
    return this.findOne({ 
      where: { email },
      relations: ['posts'],
    });
  }
}
