/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max } from 'class-validator';
import { MAX_PER_PAGE } from 'src/utils/page-helper.util';

export class QueryDto {
  @IsOptional()
  @Transform(({ value }) =>
    typeof Number(value) === 'number' &&
    Number.isInteger(Number(value)) &&
    Number(value) >= 0
      ? Number(value)
      : value,
  )
  @IsInt()
  @Max(MAX_PER_PAGE)
  limit: number | undefined;

  @IsOptional()
  @Transform(({ value }) =>
    typeof Number(value) === 'number' &&
    Number.isInteger(Number(value)) &&
    Number(value) >= 0
      ? Number(value)
      : value,
  )
  @IsInt()
  page: number | undefined;

  @IsOptional()
  @IsString()
  keyword: string | undefined;
}
