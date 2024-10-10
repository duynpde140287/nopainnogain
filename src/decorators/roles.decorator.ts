/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';

/**
 * Decorator nhận role[] vào làm tham số
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
