/* eslint-disable prettier/prettier */
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersClientService } from '../../users/users-client.service';
import { RBAC } from 'src/enums/roles.enum';

@Injectable()
export class JwtClientStrategy extends PassportStrategy(
  Strategy,
  'jwt-client',
) {
  constructor(
    private readonly usersService: UsersClientService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('secret_key'),
    });
  }

  async validate(payload: {
    username: string;
    sub: number;
    roles: keyof RBAC | [];
  }) {
    return {
      user_id: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
