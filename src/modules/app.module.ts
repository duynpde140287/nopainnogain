/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigEnvModule } from '../config/config.module';
import { DatabaseMongoModule } from '../config/db/databaseMongo.module';
import { ClientSite } from './client-site/client.module';
import { AdminSite } from './admin/admin.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionFilter } from 'src/filters/mongo-exception.filter';
import { RolesGuard } from 'src/guards/roles.guard';
import { OracleDatabaseModule } from 'src/config/db/databaseOracle.module';

/**
 * Module chính, tất cả các route lớn sẽ được gom ở đây
 */
@Module({
  imports: [
    ConfigEnvModule,
    DatabaseMongoModule,
    OracleDatabaseModule,
    ClientSite,
    AdminSite,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
