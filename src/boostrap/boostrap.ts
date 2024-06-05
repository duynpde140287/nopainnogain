/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { EnvConfiguration } from 'src/config/env/env.config';

export class App {
  static async start(module: any) {
    const app = await NestFactory.create<NestExpressApplication>(module);
    await App.setup(app);
  }

  static async setup(app: NestExpressApplication) {
    await app.listen(EnvConfiguration().port || 8888, () =>
      console.log(`Lisenting on port ${EnvConfiguration().port} 🐉🐉🐉`),
    );
  }
}
