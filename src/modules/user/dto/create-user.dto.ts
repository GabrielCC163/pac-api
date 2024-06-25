import { BaseResponseDto } from '@common/dto/base-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UserTypeEnum } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '00123456789' })
  @IsNotEmpty()
  @IsString()
  document: string;

  // @ApiProperty({ example: 'john@gmail.com' })
  // @IsNotEmpty()
  // @IsEmail()
  // email: string;

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
}

export class UserResponseDto extends BaseResponseDto {
  @ApiProperty({ example: 'John' })
  name: string;

  @ApiProperty({ example: '00123456789' })
  document: string;

  // @ApiProperty({ example: 'john@gmail.com' })
  // email: string;

  @ApiProperty({ example: UserTypeEnum.TECHNICIAN })
  type: UserTypeEnum;
}
