/* eslint-disable prettier/prettier */
import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfiguration } from '../env/env.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: EnvConfiguration().mongodb,
        dbName: EnvConfiguration().database,
      }),
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  async onModuleInit() {
    try {
      await MongooseModule.forRoot(EnvConfiguration().mongodb);
      console.log('Kết nối cơ sở dữ liệu thành công!');
    } catch (error) {
      console.error('Lỗi khi kết nối cơ sở dữ liệu: ', error);
    }
  }
}
