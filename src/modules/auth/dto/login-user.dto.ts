import { UserRoleEnum } from '@modules/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'john@gmail.com' })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ example: 'abc123' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

class LoginDataResponseDto {
  @ApiProperty({ example: 'a06d1288-18be-44c1-83db-75ef1b214733' })
  sub: string;

  @ApiProperty({ example: 'john@gmail.com' })
  email: string;

  @ApiProperty({ example: UserRoleEnum.TECHNICIAN })
  role: UserRoleEnum;
}

export class LoginResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  token: string;

  @ApiProperty({ type: LoginDataResponseDto })
  data: LoginDataResponseDto;
}
