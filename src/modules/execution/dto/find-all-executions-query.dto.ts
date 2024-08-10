import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindAllExecutionsQueryDto {
  @ApiProperty({ example: 'a06d1288-18be-44c1-83db-75ef1b214733' })
  @IsNotEmpty()
  @IsUUID()
  formId: string;
}
