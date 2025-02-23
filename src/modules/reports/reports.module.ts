import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostCenterEntity } from '@modules/cost-center/entities/cost-center.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([
    CostCenterEntity,
  ])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
