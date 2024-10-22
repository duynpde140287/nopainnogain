/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// src/users/users.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { User, UserDocument } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username }).lean().exec();
  }

  async createUser(
    userId: number,
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      userId,
      username,
      email,
      password: hashedPassword,
      roles: [],
    });

    return newUser.save();
  }

  async activeUser(username: string, is_active: boolean): Promise<User> {
    const findUsername: User = await this.findOne(username);
    if (!findUsername) {
      throw new ConflictException(`Username ${username} không tồn tại!`);
    }

    return await this.userModel
      .findByIdAndUpdate(
        findUsername?._id,
        { ...findUsername, is_active },
        { new: true },
      )
      .lean()
      .exec();
  }
}
