import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt'; // For password hashing
import { JwtService } from '@nestjs/jwt'; // For JWT token generation

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService, // For generating tokens
  ) {}

  // Get account info for /auth/me route
  async getInfo(email: string): Promise<User> {
    const user = await this.authRepository.gatherInfo(email);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  // Register a new user
  async register(email: string, password: string, name: string): Promise<User> {
    if (email == "" || password == "" || name == "") {
      throw new Error('Insufficient credentials');
    } 

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    return this.authRepository.createUser(
      email, 
      hashedPassword, 
      name
    ); // Create user and save to database
  }

  // Log in and generate a JWT token
  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.authRepository.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { email: user.email, sub: user.id }; // JWT payload
      const accessToken = this.jwtService.sign(payload); // Generate token
      return { accessToken };
    }
    throw new Error('Invalid credentials');
  }

  // Token refresh (recreate the token with new expiration)
  async refreshToken(userId: string): Promise<{ accessToken: string }> {
    const user = await this.authRepository.findByEmail(userId); // User can be fetched by email or userId
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const payload = { email: user.email, sub: user.id }; // JWT payload
    const accessToken = this.jwtService.sign(payload); // Generate new token
    return { accessToken };
  }

  // Password reset (change current password)
  async resetPassword(oldPassword: string, newPassword: string, email: string): Promise<{ status: string }> {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    if (await bcrypt.compare(oldPassword, user.password)) {
      user.password = await bcrypt.hash(newPassword, 10); // Hash and update the password
      await this.authRepository.save(user); // Save updated user
      return { "status": "OK" };
    } else {
      throw new Error('Old password does not match');
    }
  }

  async logout() {
    return { message: 'Logged out successfully' };
  }
}

