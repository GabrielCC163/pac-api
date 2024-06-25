import { BaseEntity } from '@database/base.entity';
import { Column, Entity, Index } from 'typeorm';

export enum UserTypeEnum {
  TECHNICAL_MANAGER = 'TECHNICAL_MANAGER',
  TECHNICIAN = 'TECHNICIAN',
  COMPANY = 'COMPANY',
}

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  document: string;

  @Column({ type: 'text', select: false })
  password: string;

  @Column({ type: 'enum', enum: UserTypeEnum })
  type: UserTypeEnum;
}
