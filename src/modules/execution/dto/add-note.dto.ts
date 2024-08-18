import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddNoteDto {
  @ApiProperty({ example: 'Check this again'})
  @IsNotEmpty()
  @IsString()
  note: string;
}
