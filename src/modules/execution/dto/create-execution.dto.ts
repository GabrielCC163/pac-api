import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

class ExecutionValueDto {
  @ApiProperty({ example: 'abc-123' })
  @IsNotEmpty()
  @IsUUID()
  formComponentId: string;

  @ApiProperty({ example: 'Answer 1' })
  @IsNotEmpty()
  @IsString()
  value: string;

  @ApiPropertyOptional({ example: 'Justification' })
  @IsOptional()
  @IsString()
  justification?: string;
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

  @ApiProperty({
    isArray: true,
    example: [{ formComponentId: 'abc-123', value: 'answer' }],
  })
  @IsNotEmpty()
  @IsArray()
  executionValues: ExecutionValueDto[];
}
