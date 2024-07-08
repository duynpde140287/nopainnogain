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

    if (
      requiredRoles.some((requiredRole) => user.roles.includes(requiredRole))
    ) {
      return true; // User has at least one required role, allow access
    }

    throw new ForbiddenException();
  }
}
