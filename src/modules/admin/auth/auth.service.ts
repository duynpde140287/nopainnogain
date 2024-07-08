/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// src/auth/auth.service.ts

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => NotificationsService))
    private readonly notificationService: NotificationsService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (
      user &&
      (await this.usersService.comparePasswords(pass, user?.password))
    ) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(
    user: any,
  ): Promise<{ alert: string } | { access_token: string }> {
    if (!user?.is_active) {
      return {
        alert: `Tài khoản ${user?.username} đang chờ kích hoạt!`,
      };
    }

    const payload = {
      username: user.username,
      sub: user.userId,
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
    const userId = Date.now(); // or generate a proper unique ID
    const newUser = await this.usersService.createUser(
      userId,
      username,
      email,
      password,
    );

    await this.notificationService.createAlert(
      `Tài khoản ${username} cần được xét duyệt!`,
      username,
    );

    return {
      message: `Đăng kí thành công tài khoản ${newUser?.username} chờ được phê duyệt!`,
    };
  }
}
