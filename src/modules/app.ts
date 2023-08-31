import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule';

import { join } from 'path';
import {
  UsersModule,
  AuthModule,
  NewsModule,
  PriceListModule,
  ReviewsModule,
} from 'src/api';
import Config from './config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: Config.isDev ? '.env.dev' : `.env.prod`,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    UsersModule,
    AuthModule,
    NewsModule,
    PriceListModule,
    ReviewsModule,
  ],
})
export class AppModule {}
