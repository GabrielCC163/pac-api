import { Module } from '@nestjs/common';
import { TechnicalManagerService } from './technical-manager.service';
import { TechnicalManagerController } from './technical-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalManagerEntity } from './entities/technical-manager.entity';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([TechnicalManagerEntity]), UserModule],
  controllers: [TechnicalManagerController],
  providers: [TechnicalManagerService],
})
export class TechnicalManagerModule {}
