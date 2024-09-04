import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddNoteDto {
  @ApiProperty({ example: 'Check this again' })
  @IsNotEmpty()
  @IsString()
  note: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBooleanString()
  accordingly?: boolean;
}
