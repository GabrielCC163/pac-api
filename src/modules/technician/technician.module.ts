import { Module } from '@nestjs/common';
import { TechnicianService } from './technician.service';
import { TechnicianController } from './technician.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicianEntity } from './entities/technician.entity';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([TechnicianEntity]), UserModule],
  controllers: [TechnicianController],
  providers: [TechnicianService],
})
export class TechnicianModule {}
