import { UserRoleEnum } from '@modules/user/entities/user.entity';
import { UserService } from '@modules/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCostCenterDto } from './dto/create-cost-center.dto';
import { UpdateCostCenterDto } from './dto/update-cost-center.dto';
import { CostCenterEntity } from './entities/cost-center.entity';

@Injectable()
export class CostCenterService {
  constructor(
    private userService: UserService,
    @InjectRepository(CostCenterEntity)
    private costCenterRepository: Repository<CostCenterEntity>,
  ) {}

  async create(createCostCenterDto: CreateCostCenterDto) {
    const costCenterExists = await this.costCenterRepository.findOneBy({
      cnpj: createCostCenterDto.cnpj,
    });

    if (costCenterExists) {
      throw new BadRequestException('Cost center already exists');
    }

    const user = await this.userService.create({
      email: createCostCenterDto.email,
      password: createCostCenterDto.password,
      role: UserRoleEnum.COST_CENTER,
    });

    delete createCostCenterDto.email;
    delete createCostCenterDto.password;

    return await this.costCenterRepository.save({
      ...createCostCenterDto,
      userId: user.id,
    });
  }

  findAll() {
    return this.costCenterRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  update(id: string, updateCostCenterDto: UpdateCostCenterDto) {
    return this.costCenterRepository.update(id, updateCostCenterDto);
  }

  async remove(id: string) {
    await this.costCenterRepository.delete(id);
  }
}
