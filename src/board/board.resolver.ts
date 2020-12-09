import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Board } from './board.model';
import { BoardService } from './board.service';
import { CreateBoardDto } from './DTO/create-board.dto';

interface BoardInputArgs {
  title: string;
  content: string;
}

@Resolver('Board')
export class BoardResolver {
  constructor(private readonly _boardService: BoardService) {}

  @Mutation(() => Board)
  createBoard(
    @Args('board', { type: () => CreateBoardDto })
    board: CreateBoardDto,
    @Args('name', { type: () => String }) name: string,
  ) {
    return this._boardService.createBoard(board, name);
  }
}
