import { BaseResponseDto } from '@common/dto/base-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UserRoleEnum } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  name: string;

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

  @ApiProperty({ enum: UserRoleEnum, example: UserRoleEnum.CLIENT })
  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}

export class UserResponseDto extends BaseResponseDto {
  @ApiProperty({ example: 'John' })
  name: string;

  @ApiProperty({ example: 'john@gmail.com' })
  email: string;

  @ApiProperty({ example: UserRoleEnum.TECHNICIAN })
  role: UserRoleEnum;
}
