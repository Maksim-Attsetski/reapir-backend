import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Errors, IQuery, MongoUtils } from 'src/utils';
import { fileModule, IFile } from 'src/modules';

import { CreateCasesDto } from './dto/create-cases.dto';
import { UpdateCasesDto } from './dto/update-cases.dto';
import { GetCasesDto } from './dto/get-cases.dto';
import { Cases, casesDocument } from './cases.entity';

@Injectable()
export class CasesService {
  constructor(
    @InjectModel(Cases.name) private casesModel: Model<casesDocument>,
  ) {}

  async create(createCasesDto: CreateCasesDto, photos: IFile[]) {
    const names = await fileModule.createManyFiles(photos);

    const photoObj =
      names.length > 0 ? { preview: names[0], images: names } : {};

    return await MongoUtils.create({
      model: this.casesModel,
      data: { ...createCasesDto, ...photoObj },
    });
  }

  async findAll(query: IQuery) {
    return await MongoUtils.getAll({
      model: this.casesModel,
      dto: GetCasesDto,
      query,
    });
  }

  async findOne(id: string) {
    return await MongoUtils.get({
      model: this.casesModel,
      error: 'Cases',
      id,
      dto: GetCasesDto,
    });
  }

  async update(id: string, updateCasesDto: UpdateCasesDto) {
    return await MongoUtils.update({
      model: this.casesModel,
      error: 'Cases',
      id,
      data: updateCasesDto,
    });
  }

  async remove(id: string) {
    const item = await this.casesModel.findByIdAndRemove(id);

    if (!item) throw Errors.notFound('Cases');
    if (item?.images) {
      await fileModule.deleteManyFiles(item.images);
    }

    return item._id;
  }
}
