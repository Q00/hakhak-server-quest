import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { User } from './user.model';

@Injectable()
export class UserService {
  async createUser(name: string) {
    try {
      const existedUser = await getRepository(User).findOne({ name });
      console.log(existedUser);
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
}
