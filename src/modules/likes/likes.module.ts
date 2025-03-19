import { Module } from '@nestjs/common';
import { LikesController } from './controllers/likes.controller';

@Module({
  controllers: [LikesController]
})
export class LikesModule {}
