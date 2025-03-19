import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';

@Module({
  controllers: [PostsController]
})
export class PostsModule {}
