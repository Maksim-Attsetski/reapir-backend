import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ReviewsModule } from './reviews.module';
import { CreateReviewsDto } from './dto/create-reviews.dto';
import { UpdateReviewsDto } from './dto/update-reviews.dto';
import { GetReviewsDto } from './dto/get-reviews.dto';
export * from './reviews.entity';

export {
  ReviewsService,
  ReviewsController,
  ReviewsModule,
  // dto
  CreateReviewsDto,
  UpdateReviewsDto,
  GetReviewsDto,
};
