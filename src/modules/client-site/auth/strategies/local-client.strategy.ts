/* eslint-disable prettier/prettier */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthClientService } from '../auth-client.service';

@Injectable()
export class LocalClientStrategy extends PassportStrategy(
  Strategy,
  'local-client',
) {
  constructor(private readonly authClientService: AuthClientService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authClientService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu!');
    }

    return user;
  }
}
