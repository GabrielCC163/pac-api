import { Module } from '@nestjs/common';
import { ExecutionService } from './execution.service';
import { ExecutionController } from './execution.controller';
import { ExecutionEntity } from './entities/execution.entity';
import { ExecutionValueEntity } from './entities/execution-value.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicianEntity } from '@modules/technician/entities/technician.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExecutionEntity,
      ExecutionValueEntity,
      TechnicianEntity,
    ]),
  ],
  controllers: [ExecutionController],
  providers: [ExecutionService],
})
export class ExecutionModule {}
