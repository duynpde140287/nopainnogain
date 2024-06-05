import { Module } from '@nestjs/common';
import { ConfigEnvModule } from '../config/config.module';
import { DatabaseModule } from '../config/db/database.module';
import { ClientSite } from './client-site/client.module';
import { AdminSite } from './admin/admin.module';

@Module({
  imports: [ConfigEnvModule, DatabaseModule, ClientSite, AdminSite],
})
export class AppModule {}
