import { OmitType } from '@nestjs/swagger';
import { CreateTechnicianDto } from './create-technician.dto';

export class UpdateTechnicianDto extends OmitType(CreateTechnicianDto, ['costCenterId', 'role'] as const) {}
