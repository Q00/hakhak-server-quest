import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Board } from './board.model';
import { BoardService } from './board.service';

@Resolver('Board')
export class BoardResolver {
  constructor(private readonly _boardService: BoardService) {}

  @Mutation(() => Board)
  createBoard(
    @Args('title', { type: () => String }) title: string,
    @Args('content', { type: () => String }) content: string,
    @Args('userName', { type: () => String }) userName: string,
  ) {
    return this._boardService.createBoard(title, content, userName);
  }
}
