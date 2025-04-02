import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { PostRepository } from './repositories/post.repository';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../../global/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: 'secretKey', // Will change later
      signOptions: { expiresIn: '1h' }
    }),
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostRepository
  ],
})
export class PostsModule {}
