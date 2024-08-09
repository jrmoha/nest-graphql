import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true, unique: true })
  @Field()
  email: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  confirmToken: string;

  @Prop({ required: true, default: false })
  isActive: boolean;

  comparePassword: (candidatePassword: string) => boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(8);
  const hashed = await bcrypt.hash(this.password, salt);

  this.password = hashed;
  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return bcrypt
    .compare(candidatePassword, (this as UserDocument).password)
    .catch(() => false);
};

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;
}

@InputType()
export class ConfirmUserInput {
  @Field()
  email: string;

  @Field()
  confirmToken: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
@InputType()
export class ChangePasswordInput {
  @Field()
  new_password: string;
}
