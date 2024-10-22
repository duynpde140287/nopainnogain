/* eslint-disable prettier/prettier */
import { IsMongoId, IsUUID } from 'class-validator';
import { Types } from 'mongoose';

export class idDto {
  @IsMongoId({ message: 'Id sai kiểu dữ liệu!' })
  id: Types.ObjectId;
}

export class UUIDIdDto {
  @IsUUID('all', { message: 'Id sai kiểu dữ liệu!' })
  id: string; // ID kiểu UUID
}
