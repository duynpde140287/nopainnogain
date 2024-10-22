/* eslint-disable prettier/prettier */
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { ConfigEnvModule } from '../config.module';
import { Product } from 'src/modules/client-site/products/entities/product.entity';
import { UserClient } from 'src/modules/client-site/users/entity/users-client.entity';

@Module({
  imports: [
    ConfigEnvModule, // Import module config riêng
    TypeOrmModule.forRootAsync({
      imports: [ConfigEnvModule], // Đảm bảo ConfigEnvModule được sử dụng cho cấu hình
      useFactory: (configService: ConfigService) => ({
        type: 'oracle',
        host: configService.get<string>('DB_ORACLE_HOST'),
        port: configService.get<number>('DB_ORACLE_PORT'),
        username: configService.get<string>('DB_ORACLE_USERNAME'),
        password: configService.get<string>('DB_ORACLE_PASSWORD'),
        sid: configService.get<string>('DB_ORACLE_SID'),
        entities: [UserClient, Product], // Thêm các entity của bạn vào đây
        synchronize: true, // tự động tạo bảng
      }),
      inject: [ConfigService], // Inject ConfigService để lấy giá trị cấu hình
    }),
  ],
})
export class OracleDatabaseModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    if (this.dataSource.isInitialized) {
      console.log('Kết nối Oracle thành công!');
    } else {
      console.error('Lỗi khi kết nối Oracle: Kết nối không được khởi tạo.');
    }
  }
}
