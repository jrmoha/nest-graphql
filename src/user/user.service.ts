import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ChangePasswordInput,
  ConfirmUserInput,
  CreateUserInput,
  LoginInput,
  User,
  UserDocument,
} from './user.schema';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
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
  async login({ email, password }: LoginInput) {
    const user = await this.userModel
      .findOne({ email })
      .select('-__v -confirmToken');

    if (!user) throw new NotFoundException('User is not found');
    if (!user.isActive)
      throw new BadRequestException('Please confirm your email first');

    if (!(await user.comparePassword(password)))
      throw new UnauthorizedException('Wrong Password');

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }
  async change_password(user: User, { new_password }: ChangePasswordInput) {
    const user_ = await this.userModel.findById(user._id);
    if (!user_) throw new NotFoundException();
    user_.password = new_password;
    await user_.save();

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }
}
