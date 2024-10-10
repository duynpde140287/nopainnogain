/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { UUIDIdDto } from 'src/dtos/id.dto';
import { QueryDto } from 'src/dtos/query.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() body: CreateProductDto): Promise<Product> {
    return await this.productsService.create(body);
  }

  @Get()
  async findAll(@Query() query: QueryDto): Promise<{
    products: Product[];
    total: number;
    limit: number;
    page: number;
  }> {
    return await this.productsService.findAll(query);
  }

  @Get(':id')
  async findById(@Param() params: UUIDIdDto): Promise<Product> {
    return await this.productsService.findById(params);
  }

  @Patch(':id')
  async update(
    @Param() { id }: UUIDIdDto,
    @Body() body: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param() { id }: UUIDIdDto): Promise<{ message: string }> {
    return await this.productsService.remove(id);
  }
}
