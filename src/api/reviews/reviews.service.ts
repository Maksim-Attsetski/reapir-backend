import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Errors, IQuery, MongoUtils } from 'src/utils';

import { CreateReviewsDto } from './dto/create-reviews.dto';
import { UpdateReviewsDto } from './dto/update-reviews.dto';
import { Reviews, reviewsDocument } from './reviews.entity';
import { GetReviewsDto } from './dto/get-reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews.name) private reviewsModel: Model<reviewsDocument>,
  ) {}

  async create(createReviewsDto: CreateReviewsDto) {
    return await MongoUtils.create({
      model: this.reviewsModel,
      data: createReviewsDto,
    });
  }

  async findAll(query: IQuery) {
    return await MongoUtils.getAll({
      model: this.reviewsModel,
      dto: GetReviewsDto,
      query,
    });
  }

  async findOne(id: string) {
    return await MongoUtils.get({
      model: this.reviewsModel,
      error: 'Review',
      id,
      dto: GetReviewsDto,
    });
  }

  async update(id: string, updateReviewsDto: UpdateReviewsDto) {
    return await MongoUtils.update({
      model: this.reviewsModel,
      error: 'Review',
      id,
      data: updateReviewsDto,
    });
  }

  async remove(id: string) {
    const item = await this.reviewsModel.findByIdAndRemove(id);

    if (!item) throw Errors.notFound('Review');
    return item._id;
  }
}
