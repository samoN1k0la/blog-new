import { Module } from '@nestjs/common';
import { HeroesController } from './controllers/heroes.controller';
import { HeroesService } from './services/heroes.service'; 
import { HeroRepository } from './repositories/hero.repository';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../../global/database/database.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: 'secretKey', // Will change later
      signOptions: { expiresIn: '1h' }
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Only image files are allowed!'), false);
        }
      },
    }),
  ],
  controllers: [HeroesController],
  providers: [
    HeroesService,
    HeroRepository
  ],
})
export class HeroesModule {}
