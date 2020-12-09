import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { Repository } from 'typeorm';
import { Board } from './board.model';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly _boardRepository: Repository<Board>,
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  async createBoard(board: { title: string; content: string }, name: string) {
    const { title, content } = board;

    try {
      const boardRep = await this._boardRepository.create({ title, content });
      const user = await this._userRepository.findOne({ name });
      boardRep.author = user;
      await this._boardRepository.save(boardRep);

      return boardRep;
    } catch (error) {
      throw new Error(error);
    }
  }
}
