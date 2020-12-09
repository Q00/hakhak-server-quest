import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { Board } from 'src/board/board.model';
import { BoardService } from 'src/board/board.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Board])],
  providers: [UserService, UserResolver, BoardService],
  exports: [TypeOrmModule],
})
export class UserModule {}
