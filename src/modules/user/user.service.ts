import * as bcrypt from 'bcryptjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, UserTypeEnum } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: { document: createUserDto.document },
    });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const password = await bcrypt.hash(createUserDto.password, 10);
    const userDto = {
      ...createUserDto,
      type: UserTypeEnum.TECHNICIAN,
      password,
    };

    const newUser = await this.userRepository.save(userDto);
    delete newUser.password;
    return newUser;
  }

  findUserByDocument(document: string): Promise<UserEntity> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.document = :document', { document })
      .addSelect('user.password')
      .getOne();
  }
}
