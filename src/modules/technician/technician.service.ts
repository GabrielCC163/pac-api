import { UserRoleEnum } from '@modules/user/entities/user.entity';
import { UserService } from '@modules/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
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

  update(id: string, updateTechnicianDto: UpdateTechnicianDto) {
    return this.technicianRepository.update(id, updateTechnicianDto);
  }

  async remove(id: string) {
    await this.technicianRepository.delete(id);
  }
}
