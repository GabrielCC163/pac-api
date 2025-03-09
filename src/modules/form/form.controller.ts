import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@common/decorators/roles.decorator';
import { UserRoleEnum } from '@modules/user/entities/user.entity';
import { FindAllFormsQueryDto } from './dto/find-all-forms-query.dto';

@ApiTags('Forms')
@Controller('forms')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.COST_CENTER, UserRoleEnum.TECHNICIAN)
  @Post()
  create(@Body() createFormDto: CreateFormDto) {
    return this.formService.create(createFormDto);
  }

  @Roles(
    UserRoleEnum.ADMIN,
    UserRoleEnum.CLIENT,
    UserRoleEnum.COST_CENTER,
    UserRoleEnum.TECHNICIAN,
    UserRoleEnum.TECHNICAL_MANAGER,
  )
  @Get()
  findAll(@Query() findAllFormsQueryDto: FindAllFormsQueryDto) {
    return this.formService.findAll(findAllFormsQueryDto.costCenterId);
  }

  @Roles(
    UserRoleEnum.ADMIN,
    UserRoleEnum.COST_CENTER,
    UserRoleEnum.TECHNICIAN,
    UserRoleEnum.TECHNICAL_MANAGER,
    UserRoleEnum.CLIENT
  )
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.formService.findOne(id);
  }

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.COST_CENTER, UserRoleEnum.TECHNICIAN)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.formService.remove(id);
  }
}
