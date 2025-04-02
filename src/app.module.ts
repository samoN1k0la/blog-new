import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './global/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ReportsModule } from './modules/reports/reports.module';
import { HeroesModule } from './modules/heroes/heroes.module';
import { LikesModule } from './modules/likes/likes.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { SettingsModule } from './modules/settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule, 
    PostsModule, 
    //CommentsModule, 
    //CategoriesModule, 
    //ReportsModule, 
    HeroesModule, 
    //LikesModule, 
    //NotificationsModule, 
    //SettingsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
