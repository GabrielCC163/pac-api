import { OmitType } from '@nestjs/swagger';
import { CreateTechnicalManagerDto } from './create-technical-manager.dto';

export class UpdateTechnicalManagerDto extends OmitType(
  CreateTechnicalManagerDto, ['costCenterId', 'role']
) {}
