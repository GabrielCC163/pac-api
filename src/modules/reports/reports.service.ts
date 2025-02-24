import { CostCenterEntity } from '@modules/cost-center/entities/cost-center.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(CostCenterEntity)
    private costCenterRepository: Repository<CostCenterEntity>
  ) {}

  getCostCentersWithExecutions(clientId: string) {
    return this.costCenterRepository.find({
      where: { clientId, forms: { executions: { accordingly: false } } },
      relations: { forms: { executions: { executionValues: true } } },
      order: { companyName: 'ASC' }
    })
  }
}
