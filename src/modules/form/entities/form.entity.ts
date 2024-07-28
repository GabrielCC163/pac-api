import { BaseEntity } from '@database/base.entity';
import { CostCenterEntity } from '@modules/cost-center/entities/cost-center.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('forms')
export class FormEntity extends BaseEntity {
  @Column()
  @Index({ unique: true })
  title: string;

  @ManyToOne(() => CostCenterEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'cost_center_id' })
  costCenter: CostCenterEntity;

  @Column({ name: 'cost_center_id' })
  costCenterId: string;
}
