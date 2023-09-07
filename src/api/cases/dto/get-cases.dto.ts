import { UpdateCasesDto } from './update-cases.dto';

export class GetCasesDto extends UpdateCasesDto {
  _id: string;
  createdAt: number;

  constructor(model: GetCasesDto) {
    super();

    this.title = model?.title;
    this.description = model?.description;
    this.tag = model?.tag;
    this._id = model?._id;
    this.createdAt = model?.createdAt;
    this.address = model?.address;
    this.duration = model?.duration;
    this.images = model?.images;
    this.price = model?.price;
    this.square = model?.square;
    this.type = model?.type;
  }
}
