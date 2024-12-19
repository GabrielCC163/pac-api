import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormDto } from './dto/create-form.dto';
import { FormComponentEntity } from './entities/form-component.entity';
import { FormEntity } from './entities/form.entity';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(FormEntity)
    private formRepository: Repository<FormEntity>,
    @InjectRepository(FormComponentEntity)
    private formComponentRepository: Repository<FormComponentEntity>,
  ) {}

  async create(createFormDto: CreateFormDto) {
    const formExists = await this.formRepository.findOneBy({
      title: createFormDto.title,
    });
    if (formExists) {
      throw new BadRequestException('Form already exists');
    }

    const formData = {
      title: createFormDto.title,
      costCenterId: createFormDto.costCenterId,
    };
    const form = await this.formRepository.save(formData);

    for (const component of createFormDto.components) {
      await this.formComponentRepository.save({
        title: component.title,
        subtitle: component.subtitle,
        type: component.type,
        required: component.required,
        formId: form.id,
        options: component.options,
        insertJustification: component.insertJustification,
        minValue: component.minValue,
        maxValue: component.maxValue,
        radioListTrueValue: component.radioListTrueValue,
        checkboxListTrueValueIndex: component.checkboxListTrueValueIndex,
      });
    }

    return form;
  }

  findAll(costCenterId: string): Promise<FormEntity[]> {
    return this.formRepository.find({
      where: { costCenterId },
      relations: { costCenter: true },
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: string) {
    return this.formRepository.findOne({
      where: { id },
      relations: { components: true, costCenter: true },
    });
  }

  async remove(id: string) {
    await this.formRepository.delete(id);
  }
}
