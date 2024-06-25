import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { WalletEntity } from '@modules/wallet/entities/wallet.entity';
import { WalletService } from '@modules/wallet/wallet.service';
import { TransactionService } from '@modules/transaction/transaction.service';
import { QrcodeEntity } from '@modules/qrcode/entities/qrcode.entity';
import { TransactionEntity } from '@modules/transaction/entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      WalletEntity,
      QrcodeEntity,
      TransactionEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, WalletService, TransactionService],
  exports: [UserService],
})
export class UserModule {}
