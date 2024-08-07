import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfirmUserInput, CreateUserInput, User } from './user.schema';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(input: CreateUserInput) {
    const email_exists = await this.userModel.findOne({ email: input.email });
    if (email_exists) throw new ConflictException('Email Already taken');

    const confirmToken = nanoid(32);
    return this.userModel.create({ ...input, confirmToken });
  }

  async confirm({ email, confirmToken }: ConfirmUserInput) {
    const user = await this.userModel.findOne({ email });
    if (!user || user.confirmToken !== confirmToken || user.isActive)
      throw new NotFoundException(
        'User is not found or confirm token is invalid',
      );

    user.isActive = true;
    await user.save();
    return user;
  }
}
