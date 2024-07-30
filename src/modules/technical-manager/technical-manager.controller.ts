import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { TechnicalManagerService } from './technical-manager.service';
import { CreateTechnicalManagerDto } from './dto/create-technical-manager.dto';
import { UpdateTechnicalManagerDto } from './dto/update-technical-manager.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRoleEnum } from '@modules/user/entities/user.entity';
import { Roles } from '@common/decorators/roles.decorator';
import { FindAllTechnicalManagersQueryDto } from './dto/find-all-technical-managers-query.dto';

@ApiTags('technical-managers')
@Controller('technical-managers')
export class TechnicalManagerController {
  constructor(
    private readonly technicalManagerService: TechnicalManagerService,
  ) {}

  @Roles([UserRoleEnum.ADMIN, UserRoleEnum.COST_CENTER])
  @Post()
  create(@Body() createTechnicalManagerDto: CreateTechnicalManagerDto) {
    return this.technicalManagerService.create(createTechnicalManagerDto);
  }

  @Roles([UserRoleEnum.ADMIN, UserRoleEnum.CLIENT, UserRoleEnum.COST_CENTER])
  @Get()
  findAll(
    @Query() findAllTechnicalManagersQueryDto: FindAllTechnicalManagersQueryDto,
  ) {
    return this.technicalManagerService.findAll(
      findAllTechnicalManagersQueryDto.costCenterId,
    );
  }

  @Roles([UserRoleEnum.ADMIN, UserRoleEnum.CLIENT, UserRoleEnum.COST_CENTER])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technicalManagerService.findOne(id);
  }

  @Roles([UserRoleEnum.ADMIN, UserRoleEnum.COST_CENTER])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTechnicalManagerDto: UpdateTechnicalManagerDto,
  ) {
    return this.technicalManagerService.update(id, updateTechnicalManagerDto);
  }

  @Roles([UserRoleEnum.ADMIN, UserRoleEnum.COST_CENTER])
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.technicalManagerService.remove(id);
  }
}
