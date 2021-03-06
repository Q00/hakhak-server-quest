import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardResolver } from './board.resolver';
import { Board } from './board.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([Board, User])],
  providers: [BoardService, BoardResolver],
  exports: [TypeOrmModule],
})
export class BoardModule {}
