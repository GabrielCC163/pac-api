import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTechniciansTable1722086016399 implements MigrationInterface {
  name = 'CreateTechniciansTable1722086016399';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "technicians" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "phone" character varying, "document" character varying NOT NULL, "user_id" uuid NOT NULL, "cost_center_id" uuid NOT NULL, CONSTRAINT "REL_d86d7aa49aa7823f841ac49b0b" UNIQUE ("user_id"), CONSTRAINT "PK_b14514b23605f79475be53065b3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e285891c2be33ba5bbb2e39317" ON "technicians" ("document") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_c2528f5ea78df3e939950b861c" ON "clients" ("cnpj") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_22cd312ef8aef5a982b0a0f1c1" ON "cost_centers" ("cnpj") `,
    );
    await queryRunner.query(
      `ALTER TABLE "technicians" ADD CONSTRAINT "FK_d86d7aa49aa7823f841ac49b0ba" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "technicians" ADD CONSTRAINT "FK_7dc3b897d7cb9c2eb41ccbab0cb" FOREIGN KEY ("cost_center_id") REFERENCES "cost_centers"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "technicians" DROP CONSTRAINT "FK_7dc3b897d7cb9c2eb41ccbab0cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "technicians" DROP CONSTRAINT "FK_d86d7aa49aa7823f841ac49b0ba"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_22cd312ef8aef5a982b0a0f1c1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c2528f5ea78df3e939950b861c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e285891c2be33ba5bbb2e39317"`,
    );
    await queryRunner.query(`DROP TABLE "technicians"`);
  }
}
