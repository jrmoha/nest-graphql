import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;

@Schema()
@ObjectType()
export class Author {
  @Prop()
  @Field(()=>ID)
  _id: string;

  @Prop({ required: true, trim: true })
  @Field()
  name: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);

@InputType()
export class FindAuthorInput{
  @Field()
  id:string
}