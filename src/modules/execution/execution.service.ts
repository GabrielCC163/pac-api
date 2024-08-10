import { randomUUID } from 'crypto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AppConfig } from '@config/app.config';
import { TechnicianEntity } from '@modules/technician/entities/technician.entity';
import { UserEntity, UserRoleEnum } from '@modules/user/entities/user.entity';
import {
  BadRequestException,
  Injectable,
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
  ) {
    this.s3Region = this.configService.get('aws').region;
    this.s3AccessKey = this.configService.get('aws').access_key_id;
    this.s3SecretAccessKey = this.configService.get('aws').secret_access_key;
    this.s3Bucket = this.configService.get('aws').bucket;
  }

  async create(createExecutionDto: CreateExecutionDto) {
    const executionData = {
      costCenterId: createExecutionDto.formId,
      technicianId: createExecutionDto.technicianId,
      date: new Date(),
    };
    const execution = await this.executionRepository.save(executionData);

    for (const execValue of createExecutionDto.executionValues) {
      await this.executionValueRepository.save({
        executionId: execution.id,
        formComponentId: execValue.formComponentId,
        value: execValue.value,
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
    // const expiresIn = 5000;
    const expiresIn = 60000;
    const s3Params = {
      Bucket: bucket,
      Key: key,
    };
    const command = new PutObjectCommand({...s3Params });
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
  }

  findAll(queryDto: FindAllExecutionsQueryDto): Promise<ExecutionEntity[]> {
    return this.executionRepository.find({
      where: { formId: queryDto.formId },
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: string) {
    return this.executionRepository.findOneBy({ id });
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
