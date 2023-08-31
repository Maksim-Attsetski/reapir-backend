import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News, NewsSchema } from './news.entity';

const newsModel = MongooseModule.forFeature([
  { name: News.name, schema: NewsSchema },
]);

@Module({
  imports: [newsModel],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
