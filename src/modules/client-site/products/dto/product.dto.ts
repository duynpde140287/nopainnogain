/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

/* eslint-disable prettier/prettier */
export class CreateProductDto {
  @IsNotEmpty({ message: 'Nội dung này không được để trống!' })
  @IsString()
  @Length(0, 255, { message: 'Độ dài tiêu đề từ 0-255 ký tự!' })
  name: string;

  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof Number(value) === 'number' && Number(value) >= 0
      ? Number(value)
      : value,
  )
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty({ message: 'Nội dung này không được để trống!' })
  @IsString()
  @Length(0, 1000, { message: 'Độ dài mô tả từ 0-1000 ký tự!' })
  description: string;

  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof Number(value) === 'number' &&
    Number.isInteger(Number(value)) &&
    Number(value) >= 0
      ? Number(value)
      : value,
  )
  @IsInt()
  @Min(0)
  quantity: number;
}
export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Length(0, 255, { message: 'Độ dài tiêu đề từ 0-255 ký tự!' })
  name: string;

  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof Number(value) === 'number' && Number(value) >= 0
      ? Number(value)
      : value,
  )
  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  @Length(0, 1000, { message: 'Độ dài mô tả từ 0-1000 ký tự!' })
  description: string;

  @IsOptional()
  @Transform(({ value }) =>
    typeof Number(value) === 'number' &&
    Number.isInteger(Number(value)) &&
    Number(value) >= 0
      ? Number(value)
      : value,
  )
  @IsInt()
  @Min(0)
  quantity: number;
}
