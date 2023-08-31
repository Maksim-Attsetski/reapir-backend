import { UpdatePriceListDto } from './update-news.dto';

export class GetPriceListDto extends UpdatePriceListDto {
  _id: string;
  createdAt: number;

  constructor(model: GetPriceListDto) {
    super();

    this.name = model?.name;
    this.description = model?.description;
    this.price = model?.price;
    this.unitOfMeasure = model?.unitOfMeasure;
    this._id = model?._id;
    this.createdAt = model?.createdAt;
  }
}
