import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Reviews, ReviewsSchema } from './reviews.entity';

const reviewsModel = MongooseModule.forFeature([
  { name: Reviews.name, schema: ReviewsSchema },
]);

@Module({
  imports: [reviewsModel],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
