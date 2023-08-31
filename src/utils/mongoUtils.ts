import { Model, PopulateOptions } from 'mongoose';
import { Errors, FindUtils, IQuery } from '.';

interface IProps {
  model: Model<any>;
  data?: any;
  id?: string;
  dto?: any;
  error?: string;
  query?: IQuery;
  findParams?: any;
  populate?: string | PopulateOptions | PopulateOptions[];
}

export interface IArrayRes {
  data: any[];
  count: number;
  last: boolean;
}

class MongoUtils {
  async getAll({ model, dto, query, populate }: IProps): Promise<IArrayRes> {
    const all = await FindUtils.getAllWithQuery(model, query, dto, populate);
    const count = await model.count();
    let last = false;

    if (query?.page && query?.limit) {
      last = count / query?.limit <= query?.page;
    }

    return { data: all, count, last };
  }

  async get({ model, id, dto, error }: IProps) {
    const item = await model.findById(id);

    if (!item) throw Errors.notFound(error);
    return dto ? await item.populate(Object.keys(new dto())) : item;
  }

  async create({ model, findParams, data, dto, error }: IProps) {
    const item = findParams ? await model.findOne(findParams) : null;

    if (item) throw Errors.badRequest(error);
    const newItem = await model.create({ ...data, createdAt: Date.now() });

    return dto ? await newItem.populate(Object.keys(new dto())) : newItem;
  }

  async update({ model, id, data, dto, error }: IProps) {
    const item = await model.findByIdAndUpdate(id, data);

    if (!item) throw Errors.notFound(error);
    return dto ? await item.populate(Object.keys(new dto())) : item;
  }

  async delete({ model, id, error }: IProps) {
    const item = await model.findByIdAndRemove(id);

    if (!item) throw Errors.notFound(error);
    return item._id;
  }
}

export default new MongoUtils();
