import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCostCentersTable1721948239051 implements MigrationInterface {
  name = 'CreateCostCentersTable1721948239051';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cost_centers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "company_name" character varying NOT NULL, "business_name" character varying, "cnpj" character varying NOT NULL, "address_zip_code" character varying, "address_street" character varying, "address_number" integer, "address_complement" character varying, "address_district" character varying, "address_city" character varying, "address_state" character varying, "user_id" uuid NOT NULL, "client_id" uuid NOT NULL, CONSTRAINT "REL_90ccdb8b06aaa973730da857c3" UNIQUE ("user_id"), CONSTRAINT "PK_e70f55c677c255c1f81f0ed1ccb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cost_centers" ADD CONSTRAINT "FK_90ccdb8b06aaa973730da857c33" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "cost_centers" ADD CONSTRAINT "FK_8bb585a200de2b3a88bd964ce82" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cost_centers" DROP CONSTRAINT "FK_8bb585a200de2b3a88bd964ce82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cost_centers" DROP CONSTRAINT "FK_90ccdb8b06aaa973730da857c33"`,
    );
    await queryRunner.query(`DROP TABLE "cost_centers"`);
  }
}
