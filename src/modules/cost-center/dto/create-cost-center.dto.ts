import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCostCenterDto extends CreateUserDto {
  @ApiProperty({ example: '3ed8483b-cb55-4368-ae0a-b3691914bb8b' })
  @IsNotEmpty()
  @IsUUID()
  clientId: string;

  @ApiProperty({ example: 'Cost Center LTDA' })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiPropertyOptional({ example: 'Cost Center' })
  @IsOptional()
  @IsString()
  businessName?: string;

  @ApiProperty({ example: '10517946000183' })
  @IsNotEmpty()
  @IsString()
  cnpj: string;

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
}
