/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';

/**
 * Các route ở Client
 */
@Module({
  imports: [ProductsModule],
})
export class ClientSite {}
