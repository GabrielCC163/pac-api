import { BaseResponseDto } from '@common/dto/base-response.dto';
import { ApiProperty } from '@nestjs/swagger';

class UserTransactionDto extends BaseResponseDto {
  @ApiProperty({ example: 'DEBIT or CREDIT' })
  type: string;

  @ApiProperty({ example: -10.5 })
  value: number;

  @ApiProperty({ example: 'Backpack' })
  description: string;

  @ApiProperty({ example: '754ff723-07ca-4a27-9086-f4c4c5ec11f5' })
  qrCodeId: string;

  @ApiProperty({ example: 'c7956b49-357a-4d5c-8a4b-62d5c4eca2ef' })
  walletId: string;
}

export class UserTransactionsResponseDto {
  @ApiProperty({ type: [UserTransactionDto] })
  data: UserTransactionDto[];
}
