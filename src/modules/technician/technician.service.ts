import { UserRoleEnum } from '@modules/user/entities/user.entity';
import { UserService } from '@modules/user/user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { TechnicianEntity } from './entities/technician.entity';

@Injectable()
export class TechnicianService {
  constructor(
    private userService: UserService,
    @InjectRepository(TechnicianEntity)
    private technicianRepository: Repository<TechnicianEntity>,
  ) {}

  async create(createTechnicianDto: CreateTechnicianDto) {
    const technicianExists = await this.technicianRepository.findOneBy({
      document: createTechnicianDto.document,
    });

    if (technicianExists) {
      throw new BadRequestException('Technician already exists');
    }

    const user = await this.userService.create({
      email: createTechnicianDto.email,
      password: createTechnicianDto.password,
      role: UserRoleEnum.TECHNICIAN,
    });

    delete createTechnicianDto.email;
    delete createTechnicianDto.password;

    return await this.technicianRepository.save({
      ...createTechnicianDto,
      userId: user.id,
    });
  }

  findAll(costCenterId: string): Promise<TechnicianEntity[]> {
    return this.technicianRepository.find({
      where: { costCenterId },
      relations: { costCenter: true, user: true },
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: string): Promise<TechnicianEntity> {
    return this.technicianRepository.findOne({
      where: { id },
      relations: { costCenter: true, user: true },
    });
  }

  async update(id: string, updateTechnicianDto: UpdateTechnicianDto) {
    const technician = await this.findOne(id);
    if (!technician) throw new NotFoundException('Technician not found');
    const technicianUpdateData = {
      name: updateTechnicianDto.name || technician.name,
      document: updateTechnicianDto.document || technician.document,
      phone: updateTechnicianDto.phone,
    };
    await this.technicianRepository.update(id, technicianUpdateData);

    if (updateTechnicianDto.email || updateTechnicianDto.password) {
      const userUpdateData = {
        email: updateTechnicianDto.email,
        password: updateTechnicianDto.password,
      };

      await this.userService.update(technician.userId, userUpdateData);
    }
  }

  async remove(id: string) {
    await this.technicianRepository.delete(id);
  }
}
