import { randomUUID } from 'crypto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AppConfig } from '@config/app.config';
import { TechnicianEntity } from '@modules/technician/entities/technician.entity';
import { UserEntity, UserRoleEnum } from '@modules/user/entities/user.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExecutionDto } from './dto/create-execution.dto';
import { GetUploadUrlDto } from './dto/get-upload-url.dto';
import { ExecutionValueEntity } from './entities/execution-value.entity';
import { ExecutionEntity } from './entities/execution.entity';
import { FindAllExecutionsQueryDto } from './dto/find-all-executions-query.dto';
import { TechnicalManagerEntity } from '@modules/technical-manager/entities/technical-manager.entity';
import { AddNoteDto } from './dto/add-note.dto';

@Injectable()
export class ExecutionService {
  private s3Region: string;
  private s3AccessKey: string;
  private s3SecretAccessKey: string;
  private s3Bucket: string;

  constructor(
    private readonly configService: ConfigService<AppConfig>,
    @InjectRepository(ExecutionEntity)
    private executionRepository: Repository<ExecutionEntity>,
    @InjectRepository(ExecutionValueEntity)
    private executionValueRepository: Repository<ExecutionValueEntity>,
    @InjectRepository(TechnicianEntity)
    private technicianRepository: Repository<TechnicianEntity>,
    @InjectRepository(TechnicalManagerEntity)
    private managerRepository: Repository<TechnicalManagerEntity>,
  ) {
    this.s3Region = this.configService.get('aws').region;
    this.s3AccessKey = this.configService.get('aws').access_key_id;
    this.s3SecretAccessKey = this.configService.get('aws').secret_access_key;
    this.s3Bucket = this.configService.get('aws').bucket;
  }

  async create(createExecutionDto: CreateExecutionDto) {
    const executionData = {
      formId: createExecutionDto.formId,
      technicianId: createExecutionDto.technicianId,
      date: new Date(),
    };
    const execution = await this.executionRepository.save(executionData);

    for (const execValue of createExecutionDto.executionValues) {
      await this.executionValueRepository.save({
        executionId: execution.id,
        formComponentId: execValue.formComponentId,
        value: execValue.value,
        justification: execValue.justification,
      });
    }

    return execution;
  }

  createPresignedPutUrl = ({ region, bucket, key }) => {
    const client = new S3Client({
      region,
      credentials: {
        accessKeyId: this.s3AccessKey,
        secretAccessKey: this.s3SecretAccessKey,
      },
    });
    const expiresIn = 300;
    const s3Params = {
      Bucket: bucket,
      Key: key,
    };
    const command = new PutObjectCommand(s3Params);
    return getSignedUrl(client, command, { expiresIn });
  };

  async getUploadUrl(getUploadUrlDto: GetUploadUrlDto) {
    const { formId, ext } = getUploadUrlDto;
    const key = `executions-files/${formId}/${randomUUID()}.${ext}`;
    const s3PutURL = await this.createPresignedPutUrl({
      region: this.s3Region,
      bucket: this.s3Bucket,
      key,
    });
    return {
      url: s3PutURL,
      location: `https://${this.s3Bucket}.s3.amazonaws.com/${key}`,
    };
    // curl -X PUT -T file.png -H "Content-Type: image/png" "https://pac2024.s3.sa-east-1.amazonaws.com/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQLVQQUWUKO5EZRIO%2F20240810%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240810T160249Z&X-Amz-Expires=300&X-Amz-Signature=2f8f250adf06215620ff94773e078e886132c5617b0f96568be92a3f09ccc2d8&X-Amz-SignedHeaders=host&x-id=PutObject"
  }

  async updateNote(
    executionId: string,
    executionValueId: string,
    userId: string,
    noteDto: AddNoteDto,
  ) {
    const executionValue = await this.executionValueRepository.findOne({
      where: {
        id: executionValueId,
        executionId,
      },
    });

    if (!executionValue) {
      throw new NotFoundException('Execution value not found');
    }

    const technicalManager = await this.managerRepository.findOneBy({ userId });
    await this.executionValueRepository.update(executionValueId, {
      ...noteDto,
      technicalManagerId: technicalManager.id,
    });
  }

  findAll(queryDto: FindAllExecutionsQueryDto): Promise<ExecutionEntity[]> {
    return this.executionRepository.find({
      where: { formId: queryDto.formId },
      relations: { technician: true },
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: string) {
    return this.executionRepository
      .createQueryBuilder('executions')
      .innerJoinAndSelect('executions.technician', 'technicians')
      .innerJoinAndSelect('executions.executionValues', 'executionValues')
      .leftJoinAndSelect(
        'executionValues.technicalManager',
        'technicalManagers',
      )
      .where('executions.id = :id', { id })
      .getOne();
  }

  async remove(user: UserEntity, id: string) {
    const execution = await this.executionRepository.findOneBy({ id });
    if (!execution) {
      throw new BadRequestException('Execution not found');
    }

    if (user.role === UserRoleEnum.TECHNICIAN) {
      const technicianId = execution.technicianId;
      const technician = await this.technicianRepository.findOneBy({
        id: technicianId,
      });
      if (technician.userId !== user.id) {
        throw new UnauthorizedException(
          'You are not allowed to remove this execution',
        );
      }
    }
    await this.executionRepository.delete(id);
  }
}
