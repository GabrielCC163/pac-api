import { PartialType } from '@nestjs/swagger';
import { CreateTechnicalManagerDto } from './create-technical-manager.dto';

export class UpdateTechnicalManagerDto extends PartialType(
  CreateTechnicalManagerDto,
) {}
