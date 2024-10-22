/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Khiên chặn jwt, kết hợp với strategies: giải mã jwt lấy thông tin đăng nhập
 */
@Injectable()
export class JwtAuthClientGuard extends AuthGuard('jwt-client') {}
