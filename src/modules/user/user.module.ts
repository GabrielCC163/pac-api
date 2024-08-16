import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientEntity } from '@modules/client/entities/client.entity';
import { CostCenterEntity } from '@modules/cost-center/entities/cost-center.entity';
import { TechnicianEntity } from '@modules/technician/entities/technician.entity';
import { TechnicalManagerEntity } from '@modules/technical-manager/entities/technical-manager.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ClientEntity,
      CostCenterEntity,
      TechnicianEntity,
      TechnicalManagerEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
