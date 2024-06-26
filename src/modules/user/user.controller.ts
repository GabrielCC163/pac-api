import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto, UserResponseDto } from './dto/create-user.dto';
import { IsPublic } from '@common/decorators/ispublic.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @IsPublic()
  @ApiCreatedResponse({
    type: UserResponseDto,
    description: 'User created',
  })
  @ApiBadRequestResponse({ description: 'User already exists' })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @Get('current-user')
  @ApiOkResponse({ type: UserResponseDto, description: 'Logged in user' })
  findCurrentUser(@CurrentUser() user: UserEntity) {
    return user;
  }
}
