import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;

@Schema()
export class Author {
  @Prop()
  _id: string;

  @Prop({ required: true, trim: true })
  name: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
