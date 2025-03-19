import { Module } from '@nestjs/common';
import { HeroesController } from './controllers/heroes.controller';

@Module({
  controllers: [HeroesController]
})
export class HeroesModule {}
