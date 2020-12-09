import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Board } from 'src/board/board.model';
import { BoardService } from 'src/board/board.service';
import { User } from './user.model';
import { UserService } from './user.service';
@Resolver('User')
export class UserResolver {
  constructor(
    private readonly _userService: UserService,
    private readonly _boardService: BoardService,
  ) {}

  @Mutation(() => User)
  createUser(
    @Args('name', { type: () => String, nullable: true }) name: string,
  ) {
    return this._userService.createUser(name);
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this._userService.deleteUser(id);
  }

  @Query(() => User)
  async author(@Args('name', { type: () => String }) name: string) {
    return this._userService.findOneByName(name);
  }

  @Query(() => [Board])
  async getBoards(@Args('userName', { type: () => String }) userName: string) {
    return this._boardService.findAll(userName);
  }
}
