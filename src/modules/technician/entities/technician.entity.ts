import { BaseEntity } from '@database/base.entity';
import { CostCenterEntity } from '@modules/cost-center/entities/cost-center.entity';
import { UserEntity } from '@modules/user/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity('technicians')
export class TechnicianEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  phone?: string;

  @Column()
  @Index({ unique: true })
  document: string;

  @OneToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => CostCenterEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'cost_center_id' })
  costCenter: CostCenterEntity;

  @Column({ name: 'cost_center_id' })
  costCenterId: string;
}
