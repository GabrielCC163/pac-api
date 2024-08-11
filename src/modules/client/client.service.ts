import { UserRoleEnum } from '@modules/user/entities/user.entity';
import { UserService } from '@modules/user/user.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientEntity } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    private userService: UserService,
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const clientExists = await this.clientRepository.findOneBy({
      cnpj: createClientDto.cnpj,
    });

    if (clientExists) {
      throw new BadRequestException('Client already exists');
    }

    const user = await this.userService.create({
      email: createClientDto.email,
      password: createClientDto.password,
      role: UserRoleEnum.CLIENT,
    });

    delete createClientDto.email;
    delete createClientDto.password;

    return await this.clientRepository.save({
      ...createClientDto,
      userId: user.id,
    });
  }

  findAll() {
    return this.clientRepository.find({
      relations: { user: true },
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: string) {
    return this.clientRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) throw new NotFoundException('Client not found');

    if (updateClientDto.email || updateClientDto.password) {
      const userUpdateData = {
        email: updateClientDto.email,
        password: updateClientDto.password,
      }

      await this.userService.update(client.userId, userUpdateData);
    }

    delete updateClientDto.email;
    delete updateClientDto.password;
    const clientUpdateData = {
      ...updateClientDto,
      companyName: updateClientDto.companyName || client.companyName,
      cnpj: updateClientDto.cnpj || client.cnpj
    }

    await this.clientRepository.update(id, clientUpdateData);
  }

  async remove(id: string) {
    await this.clientRepository.delete(id);
  }
}
