/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { EnvConfiguration } from 'src/config/env/env.config';
import { ValidationConfig } from 'src/config/validations/validation.config';
import { AllExceptionFilter } from 'src/filters/mongo-exception.filter';

export class App {
  static async start(module: any) {
    const app = await NestFactory.create<NestExpressApplication>(module);
    await App.setup(app);
  }

  static async setup(app: NestExpressApplication) {
    app.useGlobalPipes(new ValidationPipe(ValidationConfig));
    app.useGlobalFilters(new AllExceptionFilter());

    await app.listen(EnvConfiguration().port || 8888, () =>
      console.log(`Listening on port ${EnvConfiguration().port} 🐉🐉🐉`),
    );
  }
}
