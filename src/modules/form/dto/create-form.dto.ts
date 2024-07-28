import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { FormComponentTypeEnum } from '../entities/form-component.entity';

class CreateFormComponentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiProperty({
    enum: FormComponentTypeEnum,
    example: FormComponentTypeEnum.TEXT,
  })
  @IsNotEmpty()
  @IsEnum(FormComponentTypeEnum)
  type: FormComponentTypeEnum;
}

export class CreateFormDto {
  @ApiProperty({ example: 'Form One' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: '3ed8483b-cb55-4368-ae0a-b3691914bb8b' })
  @IsNotEmpty()
  @IsUUID()
  costCenterId: string;

  @ApiProperty({ type: CreateFormComponentDto })
  @IsNotEmpty()
  @IsArray()
  formComponents: CreateFormComponentDto[];
}
