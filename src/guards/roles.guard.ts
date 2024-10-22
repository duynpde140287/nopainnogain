/* eslint-disable prettier/prettier */
// src/guards/roles.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { RBAC } from 'src/enums/roles.enum';

/**
 * Kiểm tra quyền user
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService, // Inject ConfigService to get secret key
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<(keyof RBAC)[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No role requirement, allow access
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request?.headers?.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    const secretKey = this.configService.get<string>('secret_key'); // Get secret key from config
    const user: any = jwt.verify(token, secretKey);

    if (!user) {
      throw new UnauthorizedException();
    }

    let rolesArr = user?.roles;

    if (typeof rolesArr === 'string') {
      rolesArr?.includes(' ')
        ? (rolesArr = rolesArr?.replace(/[\[\]]/g, '').split(', '))
        : (rolesArr = rolesArr?.replace(/[\[\]]/g, '').split(','));
    }
    // console.log(rolesArr);

    if (requiredRoles.some((requiredRole) => rolesArr.includes(requiredRole))) {
      return true;
    }

    throw new ForbiddenException('Tài khoản chưa được cấp quyền!');
  }
}
