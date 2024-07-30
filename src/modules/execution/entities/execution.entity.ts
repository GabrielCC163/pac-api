import { BaseEntity } from '@database/base.entity';
import { FormEntity } from '@modules/form/entities/form.entity';
import { TechnicianEntity } from '@modules/technician/entities/technician.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('executions')
export class ExecutionEntity extends BaseEntity {
  @ManyToOne(() => FormEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'form_id' })
  costCenter: FormEntity;

  @Column({ name: 'form_id' })
  costCenterId: string;

  @ManyToOne(() => TechnicianEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'technician_id' })
  technician: TechnicianEntity;

  @Column({ name: 'technician_id' })
  technicianId: string;

  @Column({ type: 'timestamp' })
  date: Date;
}
