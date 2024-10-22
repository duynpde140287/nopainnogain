/* eslint-disable prettier/prettier */
import { IsIn } from 'class-validator';
import { booleanStringEnum } from 'src/enums/true-false.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('PRODUCTS')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  description: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'char', length: 1, default: booleanStringEnum.NO })
  @IsIn([booleanStringEnum.NO, booleanStringEnum.YES], {
    message: 'Giá trị chỉ có thể là N (false) hoặc Y (true) !!!',
  })
  is_deleted: string;
}
