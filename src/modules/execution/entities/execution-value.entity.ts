import { FormComponentEntity } from '@modules/form/entities/form-component.entity';
import { TechnicalManagerEntity } from '@modules/technical-manager/entities/technical-manager.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExecutionEntity } from './execution.entity';

@Entity('execution_values')
export class ExecutionValueEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ExecutionEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'execution_id' })
  execution: ExecutionEntity;

  @Column({ name: 'execution_id' })
  executionId: string;

  @ManyToOne(() => FormComponentEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'form_component_id' })
  formComponent: FormComponentEntity;

  @Column({ name: 'form_component_id' })
  formComponentId: string;

  @Column({ type: 'text' })
  value: string;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @ManyToOne(() => TechnicalManagerEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'technical_manager_id' })
  technicalManager?: TechnicalManagerEntity;

  @Column({ name: 'technical_manager_id', nullable: true })
  technicalManagerId?: string;
}
