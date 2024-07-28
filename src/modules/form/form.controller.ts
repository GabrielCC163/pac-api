import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@common/decorators/roles.decorator';
import { UserRoleEnum } from '@modules/user/entities/user.entity';

@ApiTags('Forms')
@Controller('forms')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Roles([
    UserRoleEnum.ADMIN,
    UserRoleEnum.COST_CENTER,
    UserRoleEnum.TECHNICIAN,
  ])
  @Post()
  create(@Body() createFormDto: CreateFormDto) {
    return this.formService.create(createFormDto);
  }

  @Roles([
    UserRoleEnum.ADMIN,
    UserRoleEnum.CLIENT,
    UserRoleEnum.COST_CENTER,
    UserRoleEnum.TECHNICIAN,
    UserRoleEnum.TECHNICAL_MANAGER,
  ])
  @Get()
  findAll() {
    return this.formService.findAll();
  }

  @Roles([
    UserRoleEnum.ADMIN,
    UserRoleEnum.COST_CENTER,
    UserRoleEnum.TECHNICIAN,
  ])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formService.findOne(id);
  }

  @Roles([
    UserRoleEnum.ADMIN,
    UserRoleEnum.COST_CENTER,
    UserRoleEnum.TECHNICIAN,
  ])
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.formService.remove(id);
  }
}
