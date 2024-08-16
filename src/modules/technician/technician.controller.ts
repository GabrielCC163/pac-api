import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Query,
  Put,
} from '@nestjs/common';
import { TechnicianService } from './technician.service';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@common/decorators/roles.decorator';
import { UserRoleEnum } from '@modules/user/entities/user.entity';
import { FindAllTechniciansQueryDto } from './dto/find-all-technicians-query.dto';

@ApiTags('technicians')
@Controller('technicians')
export class TechnicianController {
  constructor(private readonly technicianService: TechnicianService) {}

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.CLIENT, UserRoleEnum.COST_CENTER)
  @Post()
  create(@Body() createTechnicianDto: CreateTechnicianDto) {
    return this.technicianService.create(createTechnicianDto);
  }

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.CLIENT, UserRoleEnum.COST_CENTER)
  @Get()
  findAll(@Query() findAllTechniciansQueryDto: FindAllTechniciansQueryDto) {
    return this.technicianService.findAll(
      findAllTechniciansQueryDto.costCenterId,
    );
  }

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.CLIENT, UserRoleEnum.COST_CENTER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technicianService.findOne(id);
  }

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.CLIENT, UserRoleEnum.COST_CENTER)
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateTechnicianDto: UpdateTechnicianDto,
  ) {
    await this.technicianService.update(id, updateTechnicianDto);
  }

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.CLIENT, UserRoleEnum.COST_CENTER)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.technicianService.remove(id);
  }
}
