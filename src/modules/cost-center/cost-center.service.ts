import { UserRoleEnum } from '@modules/user/entities/user.entity';
import { UserService } from '@modules/user/user.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  findAll(clientId: string): Promise<CostCenterEntity[]> {
    return this.costCenterRepository.find({
      where: { clientId },
      relations: { client: true, user: true },
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: string) {
    return this.costCenterRepository.findOne({
      where: { id },
      relations: { client: true, user: true },
    });
  }

  async update(id: string, updateCostCenterDto: UpdateCostCenterDto) {
    const costCenter = await this.costCenterRepository.findOneBy({ id });
    if (!costCenter) throw new NotFoundException('Cost center not found');
    if (updateCostCenterDto.email || updateCostCenterDto.password) {
      const userUpdateData = {
        email: updateCostCenterDto.email,
        password: updateCostCenterDto.password,
      }

      await this.userService.update(costCenter.userId, userUpdateData);
    }

    delete updateCostCenterDto.email;
    delete updateCostCenterDto.password;
    const costCenterUpdateData = {
      ...updateCostCenterDto,
      companyName: updateCostCenterDto.companyName || costCenter.companyName,
      cnpj: updateCostCenterDto.cnpj || costCenter.cnpj
    }

    await this.costCenterRepository.update(id, costCenterUpdateData);
  }

  async remove(id: string) {
    await this.costCenterRepository.delete(id);
  }
}
