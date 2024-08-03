import { Field, ID, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Author } from 'src/author/author.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema()
@ObjectType()
export class Book {
  @Field(() => ID)
  _id?: string;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop({ required: true })
  @Field()
  average_rating: string;

  @Prop({ required: true })
  @Field()
  isbn: string;

  @Prop({ required: true })
  @Field()
  language_code: string;

  @Prop({ type: Types.ObjectId, ref: 'Author' })
  @Field(() => Author)
  author: Author | string;
}

export const BookSchema = SchemaFactory.createForClass(Book);

@InputType()
export class FindBookInput {
  @Field()
  _id: string;
}

export class UpdateBookInput extends PartialType(Book, InputType) {}
