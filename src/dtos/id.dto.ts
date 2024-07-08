/* eslint-disable prettier/prettier */
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class idDto {
  @IsMongoId({ message: 'Id sai kiểu dữ liệu!' })
  id: Types.ObjectId;
}
