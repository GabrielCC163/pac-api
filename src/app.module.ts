import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, minutes, seconds } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config as TypeOrmConfig } from './ormconfig';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { JwtAuthGuard } from '@modules/auth/guard/jwt-auth.guard';
import { getConfig } from '@config/app.config';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ClientModule } from './modules/client/client.module';
import { CostCenterModule } from './modules/cost-center/cost-center.module';
import { TechnicianModule } from './modules/technician/technician.module';
import { TechnicalManagerModule } from './modules/technical-manager/technical-manager.module';
import { FormModule } from './modules/form/form.module';
import { ExecutionModule } from './modules/execution/execution.module';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getConfig],
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: seconds(1),
        limit: 3,
      },
      {
        name: 'medium',
        ttl: seconds(10),
        limit: 20,
      },
      {
        name: 'long',
        ttl: minutes(1),
        limit: 100,
      },
    ]),
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: { singleLine: true },
        },
      },
    }),
    TypeOrmModule.forRoot({ ...TypeOrmConfig, autoLoadEntities: true }),
    UserModule,
    AuthModule,
    ClientModule,
    CostCenterModule,
    TechnicianModule,
    TechnicalManagerModule,
    FormModule,
    ExecutionModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
