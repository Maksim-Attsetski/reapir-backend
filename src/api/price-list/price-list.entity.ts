import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type priceListDocument = HydratedDocument<PriceList>;

@Schema()
export class PriceList {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  unitOfMeasure: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  createdAt: number;
}

export const priceListSchema = SchemaFactory.createForClass(PriceList);
