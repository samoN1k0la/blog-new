import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Bearer token

    if (!token) {
      throw new Error('Unauthorized');
    }

    try {
      const decoded = this.jwtService.verify(token); // Verify JWT token
      request.user = decoded; // Attach user data to request
      //console.log(request.user);
      return true;
    } catch (error) {
      throw new Error('Unauthorized');
    }
  }
}

