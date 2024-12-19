import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormEntity } from './form.entity';

export enum FormComponentTypeEnum {
  NUMBER = 'number',
  TEXT = 'text',
  CHECKBOX_LIST = 'checkbox_list',
  RADIO_LIST = 'radio_list',
  DATE = 'date',
  UPLOAD = 'upload',
}

@Entity('form_components')
export class FormComponentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  subtitle?: string;

  @Column({ type: 'enum', enum: FormComponentTypeEnum })
  type: FormComponentTypeEnum;

  @Column()
  required: boolean;

  @Column({ type: 'varchar', array: true, nullable: true })
  options?: string[];

  @Column({ type: 'boolean', default: false })
  insertJustification: boolean;

  @ManyToOne(() => FormEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'form_id' })
  form: FormEntity;

  @Column({ name: 'form_id' })
  formId: string;

  @Column({ name: 'max_value', nullable: true })
  maxValue?: number;

  @Column({ name: 'min_value', nullable: true })
  minValue?: number;

  @Column({ name: 'true_value', nullable: true })
  trueValue?: string;
}
