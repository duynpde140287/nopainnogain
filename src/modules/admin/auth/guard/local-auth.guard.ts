/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Khiên chặn local, kết hợp với strategies: dùng cho đăng nhập
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
