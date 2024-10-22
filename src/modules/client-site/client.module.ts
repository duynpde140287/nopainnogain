/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { AuthClientModule } from './auth/auth-client.module';
import { UsersClientModule } from './users/users-client.module';

/**
 * Các route ở Client
 */
@Module({
  imports: [AuthClientModule, UsersClientModule, ProductsModule],
})
export class ClientSite {}
