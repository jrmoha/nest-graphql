import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Author } from 'src/author/author.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  average_rating: string;

  @Prop({ required: true })
  isbn: string;

  @Prop({ required: true })
  language_code: string;

  @Prop({ type: Types.ObjectId, ref: 'Author' })
  author: Author | string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
