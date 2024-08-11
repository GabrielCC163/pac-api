import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
export class UpdateClientDto {
  @ApiPropertyOptional({ example: 'Cost Center LTDA' })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional({ example: 'Cost Center' })
  @IsOptional()
  @IsString()
  businessName?: string;

  @ApiPropertyOptional({ example: '10517946000183' })
  @IsOptional()
  @IsString()
  cnpj?: string;

  @ApiPropertyOptional({ example: '88025-000' })
  @IsOptional()
  @IsString()
  addressZipCode?: string;

  @ApiPropertyOptional({ example: 'Tech Avenue' })
  @IsOptional()
  @IsString()
  addressStreet?: string;

  @ApiPropertyOptional({ example: 123 })
  @IsOptional()
  @IsNumber()
  addressNumber?: number;

  @ApiPropertyOptional({ example: 'Bl 6' })
  @IsOptional()
  @IsString()
  addressComplement?: string;

  @ApiPropertyOptional({ example: 'Euro Garden' })
  @IsOptional()
  @IsString()
  addressDistrict?: string;

  @ApiPropertyOptional({ example: 'Miami' })
  @IsOptional()
  @IsString()
  addressCity?: string;

  @ApiPropertyOptional({ example: 'Florida' })
  @IsOptional()
  @IsString()
  addressState?: string;

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
