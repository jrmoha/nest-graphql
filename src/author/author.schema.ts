import { Field, ID, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Book } from '../book/book.schema';

export type AuthorDocument = Author & Document;

@Schema()
@ObjectType()
export class Author {
  @Prop()
  @Field(() => ID)
  _id: string;

  @Prop({ required: true, trim: true })
  @Field()
  name: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' } })
  @Field(() => [Book])
  books: Book[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
@InputType()
export class FindAuthorInput {
  @Field(() => ID)
  _id: string;
}

@InputType()
export class CreateAuthorInput {
  @Field({ nullable: true })
  _id: string;

  @Field()
  name: string;
}

@InputType()
export class UpdateAuthorInput {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;
}
@InputType()
export class AddBookToAuthorInput {
  @Field()
  _id: string;

  @Field(() => ID)
  bookId: string;
}
@InputType()
export class DeleteAuthorInput {
  @Field(() => ID)
  _id: string;
}
