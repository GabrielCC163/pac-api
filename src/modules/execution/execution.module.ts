import { Module } from '@nestjs/common';
import { ExecutionService } from './execution.service';
import { ExecutionController } from './execution.controller';
import { ExecutionEntity } from './entities/execution.entity';
import { ExecutionValueEntity } from './entities/execution-value.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ExecutionEntity, ExecutionValueEntity])],
  controllers: [ExecutionController],
  providers: [ExecutionService],
})
export class ExecutionModule {}
