/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('USERCLIENTS')
export class UserClient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'number' })
  user_id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 }) //
  password: string;

  @Column({ type: 'varchar', unique: true, length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 1000, default: '[]' })
  roles: string;

  @Column({ type: 'char', length: 1, default: 'Y' })
  is_active: string;
}
