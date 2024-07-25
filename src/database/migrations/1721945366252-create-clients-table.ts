import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientsTable1721945366252 implements MigrationInterface {
  name = 'CreateClientsTable1721945366252';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "company_name" character varying NOT NULL, "business_name" character varying, "cnpj" character varying NOT NULL, "address_zip_code" character varying, "address_street" character varying, "address_number" integer, "address_complement" character varying, "address_district" character varying, "address_city" character varying, "address_state" character varying, "user_id" uuid NOT NULL, CONSTRAINT "REL_07a7a09b04e7b035c9d90cf498" UNIQUE ("user_id"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD CONSTRAINT "FK_07a7a09b04e7b035c9d90cf4984" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clients" DROP CONSTRAINT "FK_07a7a09b04e7b035c9d90cf4984"`,
    );
    await queryRunner.query(`DROP TABLE "clients"`);
  }
}
