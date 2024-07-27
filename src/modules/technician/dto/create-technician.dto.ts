import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTechnicianDto extends CreateUserDto {
  @ApiProperty({ example: '3ed8483b-cb55-4368-ae0a-b3691914bb8b' })
  @IsNotEmpty()
  @IsUUID()
  costCenterId: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '01234567890' })
  @IsNotEmpty()
  @IsString()
  document: string;

  @ApiPropertyOptional({ example: '48988776655' })
  @IsOptional()
  @IsString()
  phone?: string;
}
