import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto, UserResponseDto } from './dto/create-user.dto';
import { IsPublic } from '@common/decorators/ispublic.decorator';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WalletService } from '@modules/wallet/wallet.service';
import { TransactionService } from '@modules/transaction/transaction.service';
import { UserTransactionsResponseDto } from './dto/user-transactions-response.dto';
import { UserWalletsResponseDto } from './dto/user-wallets-response.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly walletService: WalletService,
    private readonly transactionService: TransactionService,
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

  @Get('current-user')
  @ApiOkResponse({ type: UserResponseDto, description: 'Logged in user' })
  findCurrentUser(@CurrentUser() user: UserEntity) {
    return user;
  }

  @Get(':userId/wallets')
  @ApiOkResponse({
    type: UserWalletsResponseDto,
    description: 'User (client or accredited) wallets',
  })
  async findWalletsFromUser(
    @CurrentUser() user: UserEntity,
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ) {
    if (user.id !== userId) throw new ForbiddenException();
    const wallets = await this.walletService.findWalletsFromUser(user.id);
    return { data: wallets };
  }

  @Get(':userId/transactions')
  @ApiOkResponse({
    type: UserTransactionsResponseDto,
    description: 'User (client or accredited) transactions',
  })
  async findAllFromUser(
    @CurrentUser() user: UserEntity,
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ) {
    if (user.id !== userId) throw new ForbiddenException();
    const transactions = await this.transactionService.findAllFromUser(user.id);
    return { data: transactions };
  }
}
