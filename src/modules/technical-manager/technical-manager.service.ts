import { UserRoleEnum } from '@modules/user/entities/user.entity';
import { UserService } from '@modules/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTechnicalManagerDto } from './dto/create-technical-manager.dto';
import { UpdateTechnicalManagerDto } from './dto/update-technical-manager.dto';
import { TechnicalManagerEntity } from './entities/technical-manager.entity';

@Injectable()
export class TechnicalManagerService {
  constructor(
    private userService: UserService,
    @InjectRepository(TechnicalManagerEntity)
    private techManagerRepository: Repository<TechnicalManagerEntity>,
  ) {}

  async create(createTechnicalManagerDto: CreateTechnicalManagerDto) {
    const techManagerExists = await this.techManagerRepository.findOneBy({
      document: createTechnicalManagerDto.document,
    });

    if (techManagerExists) {
      throw new BadRequestException('Technical manager already exists');
    }

    const user = await this.userService.create({
      email: createTechnicalManagerDto.email,
      password: createTechnicalManagerDto.password,
      role: UserRoleEnum.TECHNICAL_MANAGER,
    });

    delete createTechnicalManagerDto.email;
    delete createTechnicalManagerDto.password;

    return await this.techManagerRepository.save({
      ...createTechnicalManagerDto,
      userId: user.id,
    });
  }

  findAll(costCenterId: string): Promise<TechnicalManagerEntity[]> {
    return this.techManagerRepository.find({
      where: { costCenterId },
      relations: { costCenter: true, user: true },
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: string) {
    return this.techManagerRepository.findOne({
      where: { id },
      relations: { costCenter: true, user: true },
    });
  }

  update(id: string, updateTechnicalManagerDto: UpdateTechnicalManagerDto) {
    return this.techManagerRepository.update(id, updateTechnicalManagerDto);
  }

  async remove(id: string) {
    await this.techManagerRepository.delete(id);
  }
}
