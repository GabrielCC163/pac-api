import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsBooleanString,
  IsDefined,
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

  @ApiProperty({ example: 'true' })
  @IsNotEmpty()
  @IsBooleanString()
  required: boolean;

  @ApiProperty({ example: 'true' })
  @IsNotEmpty()
  @IsBooleanString()
  insertJustification: boolean;

  @ApiPropertyOptional({ example: ['option-1', 'option-2'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  options?: string[];
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
  components: CreateFormComponentDto[];
}
