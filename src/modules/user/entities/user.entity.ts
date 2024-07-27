import { BaseEntity } from '@database/base.entity';
import { Column, Entity, Index } from 'typeorm';

export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  COST_CENTER = 'COST_CENTER',
  TECHNICIAN = 'TECHNICIAN',
  TECHNICAL_MANAGER = 'TECHNICAL_MANAGER',
}

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  @Index({ unique: true })
  email: string;

  @Column({ type: 'text', select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRoleEnum })
  role: UserRoleEnum;
}
