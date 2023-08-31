import { UpdateReviewsDto } from './update-reviews.dto';

export class GetReviewsDto extends UpdateReviewsDto {
  _id: string;
  createdAt: number;

  constructor(model: GetReviewsDto) {
    super();

    this.title = model?.title;
    this.content = model?.content;
    this.rate = model?.rate;
    this.author_id = model?.author_id;
    this._id = model?._id;
    this.createdAt = model?.createdAt;
  }
}
