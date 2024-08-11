import { OmitType } from '@nestjs/swagger';
import { CreateCostCenterDto } from './create-cost-center.dto';

export class UpdateCostCenterDto extends OmitType(CreateCostCenterDto, ['role', 'clientId']) {}
