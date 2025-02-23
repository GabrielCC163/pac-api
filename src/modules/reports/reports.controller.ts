import { Roles } from '@common/decorators/roles.decorator';
import { UserRoleEnum } from '@modules/user/entities/user.entity';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindCostCentersWithExecutionsQueryDto } from './dto/find-cost-centers-with-executions-query.dto';
import { ReportsService } from './reports.service';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Roles(
    UserRoleEnum.ADMIN,
    UserRoleEnum.CLIENT,
  )
  @Get('cost-centers-with-executions')
  findAll(@Query() findCostCentersQueryDto: FindCostCentersWithExecutionsQueryDto) {
    return this.reportsService.getCostCentersWithExecutions(findCostCentersQueryDto.clientId);
  }
}
