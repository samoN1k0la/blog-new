import { Module } from '@nestjs/common';
import { TagsController } from './controllers/tags.controller';

@Module({
  controllers: [TagsController]
})
export class TagsModule {}
