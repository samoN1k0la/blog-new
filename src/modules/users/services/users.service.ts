import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(id: string): Promise<User | null> {
    const user = this.userRepository.findOne({ 
      where: { id },
      relations: ['posts', 'comments', 'likes', 'notifications'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async updateUserInfo(id: string, updateData: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, updateData);
    return this.getUser(id);
  }

  async deleteUser(id: string): Promise<{ status: string; message: string }> {
    const result: DeleteResult = await this.userRepository.delete(id);

    if (result.affected && result.affected > 0) {
      return { status: 'success', message: 'User successfully deleted' };
    } else {
      return { status: 'error', message: 'User not found or already deleted' };
    }
  }

  async updateUserRole(id: string, roles: string[]): Promise<User | null> {

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new Error('User not found');

    console.log(typeof roles.join(','));
    
    user.roles = roles.join(',');

    await this.userRepository.save(user); // Save the updated user

    return user;
  }

  async getReviewers(): Promise<User[]> {
    return this.userRepository.findByRoleName('REVIEWER');
  }

  async getEditors(): Promise<User[]> {
    return this.userRepository.findByRoleName('EDITOR');
  }
}

