import { TechnicianEntity } from '@modules/technician/entities/technician.entity';
import { UserEntity, UserRoleEnum } from '@modules/user/entities/user.entity';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExecutionDto } from './dto/create-execution.dto';
import { ExecutionValueEntity } from './entities/execution-value.entity';
import { ExecutionEntity } from './entities/execution.entity';

@Injectable()
export class ExecutionService {
  constructor(
    @InjectRepository(ExecutionEntity)
    private executionRepository: Repository<ExecutionEntity>,
    @InjectRepository(ExecutionValueEntity)
    private executionValueRepository: Repository<ExecutionValueEntity>,
    @InjectRepository(TechnicianEntity)
    private technicianRepository: Repository<TechnicianEntity>,
  ) {}

  async create(createExecutionDto: CreateExecutionDto) {
    const executionData = {
      costCenterId: createExecutionDto.formId,
      technicianId: createExecutionDto.technicianId,
      date: new Date(),
    };
    const execution = await this.executionRepository.save(executionData);

    for (const execValue of createExecutionDto.executionValues) {
      await this.executionValueRepository.save({
        executionId: execution.id,
        formComponentId: execValue.formComponentId,
        value: execValue.value,
      });
    }

    return execution;
  }

  findAll() {
    return `This action returns all execution`;
  }

  findOne(id: string) {
    return `This action returns a #${id} execution`;
  }

  async remove(user: UserEntity, id: string) {
    const execution = await this.executionRepository.findOneBy({ id });
    if (!execution) {
      throw new BadRequestException('Execution not found');
    }

    if (user.role === UserRoleEnum.TECHNICIAN) {
      const technicianId = execution.technicianId;
      const technician = await this.technicianRepository.findOneBy({
        id: technicianId,
      });
      if (technician.userId !== user.id) {
        throw new UnauthorizedException(
          'You are not allowed to remove this execution',
        );
      }
    }
    await this.executionRepository.delete(id);
  }
}
