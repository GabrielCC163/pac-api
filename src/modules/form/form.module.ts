import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormEntity } from './entities/form.entity';
import { FormComponentEntity } from './entities/form-component.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormEntity, FormComponentEntity])],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
