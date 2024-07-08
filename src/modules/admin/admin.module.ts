/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PapersModule } from './papers/papers.module';
import { ProductsModule } from './products/products.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [AuthModule, UsersModule, PapersModule, ProductsModule, NotificationsModule],
})
export class AdminSite {}
