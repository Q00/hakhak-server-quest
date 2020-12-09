import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
@Resolver('User')
export class UserResolver {
  constructor(private readonly _userService: UserService) {}

  @Mutation(() => User)
  createUser(
    @Args('name', { type: () => String, nullable: true }) name: string,
  ) {
    return this._userService.createUser(name);
  }
}
