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
  tag: string[];

  @Prop({ required: true })
  price: number;

  @Prop({ default: 'flat' })
  type: string;

  @Prop()
  square: number;

  @Prop()
  duration: number;

  @Prop()
  createdAt: number;
}

export const CasesSchema = SchemaFactory.createForClass(Cases);
