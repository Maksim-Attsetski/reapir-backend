import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Errors, IQuery, MongoUtils } from 'src/utils';

import { CreatePriceListDto } from './dto/create-price-list.dto';
import { UpdatePriceListDto } from './dto/update-news.dto';
import { PriceList, priceListDocument } from './price-list.entity';
import { GetPriceListDto } from './dto/get-news.dto';

@Injectable()
export class PriceListService {
  constructor(
    @InjectModel(PriceList.name)
    private priceListModel: Model<priceListDocument>,
  ) {}

  async create(createPriceListDto: CreatePriceListDto) {
    return await MongoUtils.create({
      model: this.priceListModel,
      data: createPriceListDto,
    });
  }

  async findAll(query: IQuery) {
    return await MongoUtils.getAll({
      model: this.priceListModel,
      dto: GetPriceListDto,
      query,
    });
  }

  async findOne(id: string) {
    return await MongoUtils.get({
      model: this.priceListModel,
      error: 'Цена ',
      id,
      dto: GetPriceListDto,
    });
  }

  async update(id: string, updatePriceListDto: UpdatePriceListDto) {
    return await MongoUtils.update({
      model: this.priceListModel,
      error: 'Цена ',
      id,
      data: updatePriceListDto,
    });
  }

  async remove(id: string) {
    const item = await this.priceListModel.findByIdAndRemove(id);

    if (!item) throw Errors.notFound('Цена ');
    return item._id;
  }
}
