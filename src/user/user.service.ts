import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { User } from './user.model';

@Injectable()
export class UserService {
  async createUser(name: string) {
    try {
      const existedUser = await getRepository(User).findOne({ name });
      if (existedUser) {
        throw Error('User already exists.');
      }
      const newUser = await getRepository(User).create({ name });
      await getRepository(User).save(newUser);
      return newUser;
    } catch (error) {
      throw Error(error);
    }
  }

  async deleteUser(id: number) {
    console.log('id', id);
    try {
      const existedUser = await getRepository(User).findOne({ id });

      if (!existedUser) {
        throw Error('User is not exists.');
      }

      const deleteUser = await getRepository(User).softDelete(id);

      return deleteUser ? true : false;
    } catch (error) {
      throw Error(error);
    }
  }
}
