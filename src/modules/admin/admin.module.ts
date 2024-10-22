/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PapersModule } from './papers/papers.module';

/**
 * Các route ở Admin
 */
@Module({
  imports: [AuthModule, UsersModule, NotificationsModule, PapersModule],
})
export class AdminSite {}
