import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetUploadUrlDto {
  @ApiProperty({ example: 'd52126c9-f2dc-4e1c-ac26-b7abc6988be2' })
  @IsNotEmpty()
  @IsUUID()
  formId: string;

  @ApiProperty({ example: 'png' })
  @IsNotEmpty()
  @IsString()
  ext: string;
}
