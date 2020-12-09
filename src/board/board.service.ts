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

  async createBoard(title: string, content: string, userName: string) {
    try {
      const boardRep = await this._boardRepository.create({ title, content });
      const user = await this._userRepository.findOne({ name: userName });
      if (!user) {
        throw Error('user is not exist');
      }
      boardRep.author = user;
      await this._boardRepository.save(boardRep);

      console.log(boardRep);

      return boardRep;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(userName: string) {
    try {
      const boards = await this._boardRepository
        .createQueryBuilder('board')
        .leftJoinAndSelect('board.author', 'author')
        .where('author.name = :name', { name: userName })
        // .andWhere('board.deletedAt = :deletedAt', { deletedAt: false })
        .getMany();

      if (!boards) {
        throw new Error("this user don't have boards");
      }

      return boards;
    } catch (error) {
      throw new Error(error);
    }
  }
}
