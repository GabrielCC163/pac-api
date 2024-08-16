import { Roles } from '@common/decorators/roles.decorator';
import { UserRoleEnum } from '@modules/user/entities/user.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('Clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Roles(UserRoleEnum.ADMIN)
  @Post()
  @ApiBadRequestResponse({ description: 'Client already exists' })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Roles(UserRoleEnum.ADMIN)
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.CLIENT)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.clientService.findOne(id);
  }

  @Roles(UserRoleEnum.ADMIN)
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    await this.clientService.update(id, updateClientDto);
  }

  @Roles(UserRoleEnum.ADMIN)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.clientService.remove(id);
  }
}
