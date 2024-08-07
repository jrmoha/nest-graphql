import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { ConfirmUserInput, CreateUserInput, LoginInput, User } from './user.schema';

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

  @Mutation(()=>User)
  async login(@Args('input') input: LoginInput){

  }
}
//register

//confirmUser

//login

// me
