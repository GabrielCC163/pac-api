import * as bcrypt from 'bcryptjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, UserRoleEnum } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientRequest } from 'http';
import { ClientEntity } from '@modules/client/entities/client.entity';
import { CostCenterEntity } from '@modules/cost-center/entities/cost-center.entity';
import { TechnicianEntity } from '@modules/technician/entities/technician.entity';
import { TechnicalManagerEntity } from '@modules/technical-manager/entities/technical-manager.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    @InjectRepository(CostCenterEntity)
    private costCenterRepository: Repository<CostCenterEntity>,
    @InjectRepository(TechnicianEntity)
    private technicianRepository: Repository<TechnicianEntity>,
    @InjectRepository(TechnicalManagerEntity)
    private technicalManagerRepository: Repository<TechnicalManagerEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.findUserByEmail(createUserDto.email);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const password = await bcrypt.hash(createUserDto.password, 10);
    const userDto = {
      ...createUserDto,
      password,
    };

    const newUser = await this.userRepository.save(userDto);
    delete newUser.password;
    return newUser;
  }

  findUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }

  findUserById(id: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    const updateData = {
      email: data.email || user.email,
    };
    if (data.password) {
      const password = await bcrypt.hash(data.password, 10);
      updateData['password'] = password;
    }

    await this.userRepository.update(id, updateData);
  }

  async findCurrentUser(user: UserEntity) {
    if (user.role === UserRoleEnum.ADMIN) {
      return user;
    }

    if (user.role === UserRoleEnum.CLIENT) {
      const client = await this.clientRepository.findOneBy({ userId: user.id });
      return {
        ...user,
        client,
      };
    }

    if (user.role === UserRoleEnum.COST_CENTER) {
      const costCenter = await this.costCenterRepository.findOneBy({
        userId: user.id,
      });
      return {
        ...user,
        costCenter,
      };
    }

    if (user.role === UserRoleEnum.TECHNICIAN) {
      const technician = await this.technicianRepository.findOneBy({
        userId: user.id,
      });
      return {
        ...user,
        technician,
      };
    }

    if (user.role === UserRoleEnum.TECHNICAL_MANAGER) {
      const technicalManager = await this.technicalManagerRepository.findOneBy({
        userId: user.id,
      });
      return {
        ...user,
        technicalManager,
      };
    }
  }
}
