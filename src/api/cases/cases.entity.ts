import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type casesDocument = HydratedDocument<Cases>;

@Schema()
export class Cases {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true, unique: true })
  address: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: [] })
  images: string[];

  @Prop({ default: [] })
  tags: string[];

  @Prop({ required: true })
  price: number;

  @Prop({ default: 1 })
  floors: number;

  @Prop({ default: 'flat', enum: ['flat', 'house', 'cottage'] })
  type: string;

  @Prop({ default: 0 })
  square: number;

  @Prop({ default: 0 })
  duration: number;

  @Prop()
  createdAt: number;
}

export const CasesSchema = SchemaFactory.createForClass(Cases);
