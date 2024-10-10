/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { EnvConfiguration } from 'src/config/env/env.config';
import { ValidationConfig } from 'src/config/validations/validation.config';
import { AllExceptionFilter } from 'src/filters/mongo-exception.filter';

/**
 * Lớp hỗ trợ khởi chạy và cài đặt cho module toàn cục
 */
export class App {
  /**
   * Khởi chạy module truyền vào
   */
  static async start(module: any) {
    const app = await NestFactory.create<NestExpressApplication>(module);
    await App.setup(app);
  }

  /**
   * Cài đặt các hàm toàn cục
   */
  static async setup(app: NestExpressApplication) {
    app.useGlobalPipes(new ValidationPipe(ValidationConfig));
    app.useGlobalFilters(new AllExceptionFilter());

    await app.listen(EnvConfiguration().port || 8888, () =>
      console.log(`Listening on port ${EnvConfiguration().port} 🐉🐉🐉`),
    );
  }
}
