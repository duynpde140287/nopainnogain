/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthClientService } from './auth-client.service';
import { AuthClientController } from './auth-client.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtClientStrategy } from './strategies/jwt-client.strategy';
import { LocalClientStrategy } from './strategies/local-client.strategy';
import { UsersClientModule } from '../users/users-client.module';

@Module({
  imports: [
    UsersClientModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('secret_key'),
        signOptions: { expiresIn: '3600s' },
      }),
    }),
  ],
  controllers: [AuthClientController],
  providers: [AuthClientService, JwtClientStrategy, LocalClientStrategy],
  exports: [JwtClientStrategy, LocalClientStrategy, PassportModule],
})
export class AuthClientModule {}
