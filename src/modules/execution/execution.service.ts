import { Injectable } from '@nestjs/common';
import { CreateExecutionDto } from './dto/create-execution.dto';

@Injectable()
export class ExecutionService {
  create(createExecutionDto: CreateExecutionDto) {
    return 'This action adds a new execution';
  }

  findAll() {
    return `This action returns all execution`;
  }

  findOne(id: string) {
    return `This action returns a #${id} execution`;
  }

  remove(id: string) {
    return `This action removes a #${id} execution`;
  }
}
