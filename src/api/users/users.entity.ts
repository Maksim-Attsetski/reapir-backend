import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({ required: true })
  first_name: string;

  @Prop({ default: 'Пусто' })
  last_name: string;

  @Prop()
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop()
  createdAt: number;

  @Prop({ default: ['pass'] })
  providers: ['pass' | 'google'];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
