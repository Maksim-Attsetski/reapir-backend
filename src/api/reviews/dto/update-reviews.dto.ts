import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewsDto } from './create-reviews.dto';

export class UpdateReviewsDto extends PartialType(CreateReviewsDto) {}
