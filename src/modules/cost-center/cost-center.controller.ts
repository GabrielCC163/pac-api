import { Roles } from '@common/decorators/roles.decorator';
import { UserRoleEnum } from '@modules/user/entities/user.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CostCenterService } from './cost-center.service';
import { CreateCostCenterDto } from './dto/create-cost-center.dto';
import { FindAllCostCentersQueryDto } from './dto/find-all-cost-centers-query.dto';
import { UpdateCostCenterDto } from './dto/update-cost-center.dto';

@ApiTags('Cost centers')
@Controller('cost-centers')
export class CostCenterController {
  constructor(private readonly costCenterService: CostCenterService) {}

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.CLIENT)
  @Post()
  create(@Body() createCostCenterDto: CreateCostCenterDto) {
    return this.costCenterService.create(createCostCenterDto);
  }

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.CLIENT)
  @Get()
  findAll(@Query() findAllCostCentersQueryDto: FindAllCostCentersQueryDto) {
    return this.costCenterService.findAll(findAllCostCentersQueryDto.clientId);
  }

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.CLIENT)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.costCenterService.findOne(id);
  }

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.CLIENT)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCostCenterDto: UpdateCostCenterDto,
  ) {
    return this.costCenterService.update(id, updateCostCenterDto);
  }

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.CLIENT)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.costCenterService.remove(id);
  }
}
