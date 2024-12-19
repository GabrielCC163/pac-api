import {
  AfterLoad,
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

  @Column({ name: 'max_value', type: 'int', nullable: true })
  maxValue?: number;

  @Column({ name: 'min_value', type: 'int', nullable: true })
  minValue?: number;

  @Column({ name: 'radio_list_true_value', nullable: true })
  radioListTrueValue?: string;

  @AfterLoad() _parseInt = () =>
    (this.checkboxListTrueValueIndex = parseInt(
      this.checkboxListTrueValueIndex as any,
    ));
  @Column({
    type: 'int',
    name: 'checkbox_list_true_value_index',
    nullable: true,
  })
  checkboxListTrueValueIndex?: number;
}
