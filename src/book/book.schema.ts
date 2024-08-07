import { Field, ID, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Author } from '../author/author.schema';

export type BookDocument = Book & Document;

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

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Author' })
  @Field(() => Author)
  author: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);

BookSchema.index({ author: 1 });
@InputType()
export class FindBookInput {
  @Field()
  _id: string;
}
@InputType()
export class UpdateBookInput {
  @Field()
  _id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  average_rating?: string;

  @Field({ nullable: true })
  isbn?: string;

  @Field({ nullable: true })
  language_code?: string;

  @Field({ nullable: true })
  author?: string;
}

@InputType()
export class CreateBookInput {
  @Field()
  title: string;

  @Field()
  average_rating: string;

  @Field()
  isbn: string;

  @Field()
  language_code: string;

  @Field()
  author: string;
}

@InputType()
export class DeleteBookInput {
  @Field()
  _id: string;
}
