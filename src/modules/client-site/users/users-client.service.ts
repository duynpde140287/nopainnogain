/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserClient } from './entity/users-client.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersClientService {
  constructor(
    @InjectRepository(UserClient)
    private readonly userRepository: Repository<UserClient>,
  ) {}

  async findOneUser(username: string): Promise<UserClient | undefined> {
    return await this.userRepository.findOneBy({ username });
  }

  async addUser(
    user_id: number,
    username: string,
    email: string,
    password: string,
  ): Promise<UserClient> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.save({
      user_id,
      username,
      email,
      password: hashedPassword,
    });
  }

  async activityUser(username: string, is_active: string): Promise<UserClient> {
    const findUsername: UserClient = await this.findOneUser(username);

    if (!findUsername) {
      throw new ConflictException(`Username ${username} không tồn tại!`);
    }

    return await this.userRepository.save({ ...findUsername, is_active });
  }
}
