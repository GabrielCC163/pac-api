import { Module } from '@nestjs/common';
import { ExecutionService } from './execution.service';
import { ExecutionController } from './execution.controller';
import { ExecutionEntity } from './entities/execution.entity';
import { ExecutionValueEntity } from './entities/execution-value.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicianEntity } from '@modules/technician/entities/technician.entity';
import { TechnicalManagerEntity } from '@modules/technical-manager/entities/technical-manager.entity';
import { FormComponentEntity } from '@modules/form/entities/form-component.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExecutionEntity,
      ExecutionValueEntity,
      TechnicianEntity,
      TechnicalManagerEntity,
      FormComponentEntity,
    ]),
  ],
  controllers: [ExecutionController],
  providers: [ExecutionService],
})
export class ExecutionModule {}
