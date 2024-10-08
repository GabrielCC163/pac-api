import { BaseResponseDto } from '@common/dto/base-response.dto';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { UserRoleEnum } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'john@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'abc123' })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;

  @ApiHideProperty()
  role: UserRoleEnum;
}

export class UserResponseDto extends BaseResponseDto {
  @ApiProperty({ example: 'john@gmail.com' })
  email: string;

  @ApiProperty({ example: UserRoleEnum.TECHNICIAN })
  role: UserRoleEnum;
}
