import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import {
  ChangePasswordInput,
  ConfirmUserInput,
  CreateUserInput,
  LoginInput,
  User,
} from './user.schema';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async signup(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => User)
  async confirm_user(@Args('input') input: ConfirmUserInput) {
    return this.userService.confirm(input);
  }

  @Mutation(() => String)
  async login(@Args('input') input: LoginInput) {
    return this.userService.login(input);
  }
  @Query(() => User)
  @UseGuards(AuthGuard)
  async profile(@Context('req') req: Request) {
    const user = req['user'];
    return user;
  }
  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async change_password(
    @Context('req') req: Request,
    @Args('input') input: ChangePasswordInput,
  ) {
    return this.userService.change_password(req['user'], input);
  }
}
