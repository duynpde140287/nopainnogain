/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { UUIDIdDto } from 'src/dtos/id.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { QueryDto } from 'src/dtos/query.dto';
import { paginateCalculator } from 'src/utils/page-helper.util';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(body: CreateProductDto): Promise<Product> {
    const productSaved = await this.productRepository.save({ ...body });
    return productSaved;
  }

  async findAll({ keyword, limit, page }: QueryDto): Promise<{
    products: Product[];
    total: number;
    limit: number;
    page: number;
  }> {
    const key = keyword ? `%${keyword}%` : '%%';

    const { resPerPage, currentPage, passedItem } = paginateCalculator(
      page,
      limit,
    );

    const [products, total] = await this.productRepository.findAndCount({
      where: [
        { name: Like(key) }, // Tìm kiếm theo tên sản phẩm
        { description: Like(key) }, // Tìm kiếm theo mô tả sản phẩm
      ],
      take: resPerPage, // Giới hạn số sản phẩm trên mỗi trang
      skip: passedItem, // Số sản phẩm cần bỏ qua (phân trang)
    });

    return {
      products,
      total,
      limit: resPerPage,
      page: currentPage,
    };
  }

  async findById({ id }: UUIDIdDto): Promise<Product> {
    const findId = await this.productRepository.findOneBy({ id });
    if (!findId) {
      throw new NotFoundException('Không tìm thấy id tương ứng!');
    }
    return findId;
  }

  async update(id: string, body: UpdateProductDto): Promise<Product> {
    const findId = await this.productRepository.findOneBy({ id });
    if (!findId) {
      throw new NotFoundException('Không tìm thấy id tương ứng!');
    }

    return await this.productRepository.save({ ...findId, ...body });
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleteResult = await this.productRepository.delete(id);
    if (deleteResult?.affected === 0) {
      throw new NotFoundException('Không tìm thấy sản phẩm với id đã cho!');
    }
    return { message: 'Sản phẩm đã được xóa thành công!' };
  }

  async deleteSoft(id: string) {}
}
