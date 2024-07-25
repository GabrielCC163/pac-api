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
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Roles([UserRoleEnum.ADMIN])
  @Post()
  @ApiBadRequestResponse({ description: 'Client already exists' })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Roles([UserRoleEnum.ADMIN])
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Roles([UserRoleEnum.ADMIN])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Roles([UserRoleEnum.ADMIN])
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.clientService.remove(id);
  }
}
