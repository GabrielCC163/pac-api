import { BaseResponseDto } from '@common/dto/base-response.dto';
import { ApiProperty } from '@nestjs/swagger';

class UserWalletDto extends BaseResponseDto {
  @ApiProperty({ example: 'Material Escolar' })
  segment: string;

  @ApiProperty({ example: 90.5 })
  balance: number;

  @ApiProperty({ example: 'abc123' })
  publicKey: string;

  @ApiProperty({ example: 'a06d1288-18be-44c1-83db-75ef1b214733' })
  userId: string;
}

export class UserWalletsResponseDto {
  @ApiProperty({ type: [UserWalletDto] })
  data: UserWalletDto[];
}
