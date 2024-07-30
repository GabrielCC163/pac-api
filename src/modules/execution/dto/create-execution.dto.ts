import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

class ExecutionValueDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  formComponentId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  value: string;
}

export class CreateExecutionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  formId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  technicianId: string;

  @ApiProperty({ isArray: true })
  @IsNotEmpty()
  @IsArray()
  executionValues: ExecutionValueDto[];
}
