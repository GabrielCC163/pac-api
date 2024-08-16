import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateTechnicalManagerDto {
  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: '01234567890' })
  @IsOptional()
  @IsString()
  document?: string;

  @ApiPropertyOptional({ example: '48988776655' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'john@gmail.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'abc123' })
  @IsOptional()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password?: string;
}
