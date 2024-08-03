import { Field, ID, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Book } from 'src/book/book.schema';

export type AuthorDocument = HydratedDocument<Author>;

@Schema()
@ObjectType()
export class Author {
  @Prop()
  @Field(() => ID)
  _id: string;

  @Prop({ required: true, trim: true })
  @Field()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }] })
  // @Field((type) => [Book],{nullable:true,defaultValue:[]})
  books: Book[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);

@InputType()
export class FindAuthorInput {
  @Field()
  id: string;
}

@InputType()
export class CreateAuthorInput {
  @Field({ nullable: true })
  _id: string;

  @Field()
  name: string;
}

@InputType()
export class UpdateAuthorInput extends PartialType(Author, InputType) {}
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
