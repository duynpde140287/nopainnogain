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
import { booleanStringEnum } from 'src/enums/true-false.enum';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(body: CreateProductDto): Promise<Product> {
    const findName = await this.productRepository.findOneBy({
      name: body?.name,
      is_deleted: booleanStringEnum.YES,
    });

    if (findName) {
      await this.remove(findName?.id);
    }

    const productSaved = await this.productRepository.save({
      ...body,
    });
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
        { name: Like(key), is_deleted: booleanStringEnum.NO }, // Tìm kiếm theo tên sản phẩm
        { description: Like(key), is_deleted: booleanStringEnum.NO }, // Tìm kiếm theo mô tả sản phẩm
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
    const findId = await this.productRepository.findOneBy({
      id,
      is_deleted: booleanStringEnum.NO,
    });
    if (!findId) {
      throw new NotFoundException(
        'Sản phẩm không tồn tại hoặc đã bị vô hiệu hóa!',
      );
    }
    return findId;
  }

  async update(id: string, body: UpdateProductDto): Promise<Product> {
    const [findId, findNameBody] = await Promise.all([
      this.productRepository.findOneBy({
        id,
      }),
      this.productRepository.findOneBy({ name: body?.name }),
    ]);

    if (!findId || findId?.is_deleted === booleanStringEnum.YES) {
      throw new NotFoundException(
        'Sản phẩm không tồn tại hoặc đã bị vô hiệu hóa!',
      );
    }

    if (findNameBody?.is_deleted === booleanStringEnum.YES) {
      await this.remove(findNameBody?.id);
    }
    return await this.productRepository.save({ ...findId, ...body });
  }

  async update2(id: string, body: UpdateProductDto): Promise<Product> {
    const [products] = await this.productRepository.findAndCount({
      where: [
        { id },
        { name: body?.name }, // Tìm kiếm theo tên sản phẩm
      ],
    });
    const entity = []; //Điều kiện là chỉ có một phần tử trong mảng

    let flag = 1;
    products.forEach((e) => {
      //If push, always push 1
      if (String(e.id) === id && e?.is_deleted === booleanStringEnum.NO) {
        entity.push(e);
      }
      if (String(e.id) !== id && e.name === body?.name) {
        flag = 0;
      }
    });

    // 0 product or 1 product have is_deleted = IsDeletedEnum.YES
    if (entity?.length !== 1) {
      throw new NotFoundException(
        'Sản phẩm không tồn tại hoặc đã bị vô hiệu hóa!',
      );
    }

    // 2 product, 1 findById, 1 findByName
    if (!flag) {
      if (products[1]?.is_deleted === booleanStringEnum.NO) {
        throw new NotFoundException('Trùng tên sản phẩm!');
      }
      await this.remove(products[1]?.id);
    }
    return await this.productRepository.save({ ...entity[0], ...body });
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleteResult = await this.productRepository.delete(id);
    if (deleteResult?.affected === 0) {
      throw new NotFoundException('Sản phẩm không tồn tại!');
    }
    return { message: 'Sản phẩm đã được xóa thành công!' };
  }

  async deleteSoft(id: string) {
    const findId = await this.productRepository.findOneBy({
      id,
      is_deleted: booleanStringEnum.NO,
    });
    if (!findId) {
      throw new NotFoundException(
        'Sản phẩm không tồn tại hoặc đã bị vô hiệu hóa!',
      );
    }

    await this.productRepository.save({
      ...findId,
      is_deleted: booleanStringEnum.YES,
    });
    return { message: 'Sản phẩm đã được vô hiệu hóa thành công!' };
  }
}
