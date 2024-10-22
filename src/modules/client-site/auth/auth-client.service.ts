/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import { UsersClientService } from '../users/users-client.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/passwords.util';
import { booleanStringEnum } from 'src/enums/true-false.enum';

@Injectable()
export class AuthClientService {
  constructor(
    private readonly usersClientService: UsersClientService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersClientService.findOneUser(username);
    if (user && (await comparePasswords(pass, user?.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(
    user: any,
  ): Promise<{ alert: string } | { access_token: string }> {
    if (user?.is_active === booleanStringEnum.NO) {
      return {
        alert: `Tài khoản ${user?.username} đã bị vô hiệu hóa!`,
      };
    }

    const payload = {
      username: user.username,
      sub: user.user_id,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    username: string,
    password: string,
    email: string,
  ): Promise<{ message: string }> {
    const date = new Date();
    const user_id: number = Math.floor(date.getTime() / 1000);

    const newUser = await this.usersClientService.addUser(
      user_id,
      username,
      email,
      password,
    );

    return {
      message: `Đăng kí thành công tài khoản ${newUser?.username} !`,
    };
  }
}
