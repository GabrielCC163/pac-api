import { BaseEntity } from '@database/base.entity';
import { FormEntity } from '@modules/form/entities/form.entity';
import { TechnicianEntity } from '@modules/technician/entities/technician.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ExecutionValueEntity } from './execution-value.entity';

@Entity('executions')
export class ExecutionEntity extends BaseEntity {
  @ManyToOne(() => FormEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'form_id' })
  form: FormEntity;

  @Column({ name: 'form_id' })
  formId: string;

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

  @Column({ type: 'bool', nullable: true, default: false })
  accordingly?: boolean;

  @OneToMany(() => ExecutionValueEntity, value => value.execution)
  executionValues: ExecutionValueEntity[];
}
