import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClientDto extends CreateUserDto {
  @ApiProperty({ example: 'FORD MOTORS LTDA'})
  companyName: string;

  @ApiPropertyOptional({ example: 'FORD' })
  businessName: string;

  @ApiProperty({ example: '10517946000183'})
  cnpj: string;

  @ApiPropertyOptional({ example: '88025-000' })
  @IsOptional()
  @IsString()
  addressZipCode: string;

  @ApiPropertyOptional({ example: 'Tech Avenue'})
  @IsOptional()
  @IsString()
  addressStreet: string;

  @ApiPropertyOptional({ example: 123 })
  @IsOptional()
  @IsNumber()
  addressNumber: number;

  @ApiPropertyOptional({ example: 'Bl 6'})
  @IsOptional()
  @IsString()
  addressComplement: string;

  @ApiPropertyOptional({ example: 'Euro Garden'})
  @IsOptional()
  @IsString()
  addressDistrict: string;

  @ApiPropertyOptional({ example: 'Miami'})
  @IsOptional()
  @IsString()
  addressCity: string;

  @ApiPropertyOptional({ example: 'Florida'})
  @IsOptional()
  @IsString()
  addressState: string;
}
