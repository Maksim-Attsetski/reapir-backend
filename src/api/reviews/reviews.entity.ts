import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';

export type reviewsDocument = HydratedDocument<Reviews>;

@Schema()
export class Reviews {
  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  content: string;

  @Prop({ default: 5 })
  rate: number;

  @Prop({ type: MSchema.Types.ObjectId, ref: 'Users' })
  author_id: string;

  @Prop()
  createdAt: number;
}

export const ReviewsSchema = SchemaFactory.createForClass(Reviews);
