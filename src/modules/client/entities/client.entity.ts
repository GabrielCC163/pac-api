import { BaseEntity } from '@database/base.entity';
import { UserEntity } from '@modules/user/entities/user.entity';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ name: 'business_name', nullable: true })
  businessName?: string;

  @Column()
  @Index({ unique: true })
  cnpj: string;

  @Column({ name: 'address_zip_code', nullable: true })
  addressZipCode?: string;

  @Column({ name: 'address_street', nullable: true })
  addressStreet?: string;

  @Column({ name: 'address_number', nullable: true })
  addressNumber?: number;

  @Column({ name: 'address_complement', nullable: true })
  addressComplement?: string;

  @Column({ name: 'address_district', nullable: true })
  addressDistrict?: string;

  @Column({ name: 'address_city', nullable: true })
  addressCity?: string;

  @Column({ name: 'address_state', nullable: true })
  addressState?: string;

  @OneToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  userId: string;
}
