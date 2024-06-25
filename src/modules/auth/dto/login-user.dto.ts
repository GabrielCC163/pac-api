import { UserTypeEnum } from '@modules/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'cpf or cnpj' })
  @IsNotEmpty()
  @IsString()
  readonly document: string;

  @ApiProperty({ example: '123123' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

class LoginDataResponseDto {
  @ApiProperty({ example: 'a06d1288-18be-44c1-83db-75ef1b214733' })
  sub: string;

  @ApiProperty({ example: '01234567819' })
  document: string;

  @ApiProperty({ example: 'Ana Silva' })
  name: string;

  @ApiProperty({ example: UserTypeEnum.TECHNICIAN })
  type: UserTypeEnum;
}

export class LoginResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  token: string;

  @ApiProperty({ type: LoginDataResponseDto })
  data: LoginDataResponseDto;
}
