/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersClientService } from './users-client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserClient } from './entity/users-client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserClient])],
  providers: [UsersClientService],
  exports: [UsersClientService],
})
export class UsersClientModule {}
