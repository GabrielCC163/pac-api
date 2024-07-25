import { Module } from '@nestjs/common';
import { CostCenterService } from './cost-center.service';
import { CostCenterController } from './cost-center.controller';
import { UserModule } from '@modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostCenterEntity } from './entities/cost-center.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CostCenterEntity]), UserModule],
  controllers: [CostCenterController],
  providers: [CostCenterService],
})
export class CostCenterModule {}
