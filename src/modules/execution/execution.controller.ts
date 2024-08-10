import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ExecutionService } from './execution.service';
import { CreateExecutionDto } from './dto/create-execution.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@common/decorators/roles.decorator';
import { UserEntity, UserRoleEnum } from '@modules/user/entities/user.entity';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { GetUploadUrlDto } from './dto/get-upload-url.dto';
import { FindAllExecutionsQueryDto } from './dto/find-all-executions-query.dto';

@ApiTags('Executions')
@Controller('executions')
export class ExecutionController {
  constructor(private readonly executionService: ExecutionService) {}

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.TECHNICIAN)
  @Post()
  create(@Body() createExecutionDto: CreateExecutionDto) {
    return this.executionService.create(createExecutionDto);
  }

  @Roles(
    UserRoleEnum.ADMIN,
    UserRoleEnum.TECHNICAL_MANAGER,
    UserRoleEnum.TECHNICIAN,
  )
  @Get('s3/upload-url')
  getUploadUrl(@Body() getUploadUrlDto: GetUploadUrlDto) {
    return this.executionService.getUploadUrl(getUploadUrlDto);
  }

  @Roles(
    UserRoleEnum.ADMIN,
    UserRoleEnum.CLIENT,
    UserRoleEnum.COST_CENTER,
    UserRoleEnum.TECHNICAL_MANAGER,
    UserRoleEnum.TECHNICIAN,
  )
  @Get()
  findAll(@Query() queryDto: FindAllExecutionsQueryDto) {
    return this.executionService.findAll(queryDto);
  }

  @Roles(
    UserRoleEnum.ADMIN,
    UserRoleEnum.CLIENT,
    UserRoleEnum.COST_CENTER,
    UserRoleEnum.TECHNICAL_MANAGER,
    UserRoleEnum.TECHNICIAN,
  )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.executionService.findOne(id);
  }

  @Roles(
    UserRoleEnum.ADMIN,
    UserRoleEnum.CLIENT,
    UserRoleEnum.COST_CENTER,
    UserRoleEnum.TECHNICIAN,
  )
  @Delete(':id')
  @HttpCode(204)
  async remove(@CurrentUser() user: UserEntity, @Param('id') id: string) {
    await this.executionService.remove(user, id);
  }
}
