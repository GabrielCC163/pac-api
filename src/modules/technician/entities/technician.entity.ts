import { BaseEntity } from '@database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('technicians')
export class TechnicianEntity extends BaseEntity {
  @Column()
  name: string;

  phone?: string;

  document?: string;
}
