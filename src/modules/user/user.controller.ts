import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Controller, Get } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @IsPublic()
  // @ApiCreatedResponse({
  //   type: UserResponseDto,
  //   description: 'User created',
  // })
  // @ApiBadRequestResponse({ description: 'User already exists' })
  // @Post()
  // async createUser(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @ApiBearerAuth()
  @Get('current-user')
  @ApiOkResponse({ type: UserResponseDto, description: 'Logged in user' })
  findCurrentUser(@CurrentUser() user: UserEntity) {
    return user;
  }
}
