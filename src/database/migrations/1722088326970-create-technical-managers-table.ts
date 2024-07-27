import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTechnicalManagersTable1722088326970
  implements MigrationInterface
{
  name = 'CreateTechnicalManagersTable1722088326970';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "technical_managers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "phone" character varying, "document" character varying NOT NULL, "user_id" uuid NOT NULL, "cost_center_id" uuid NOT NULL, CONSTRAINT "REL_1372e68e6f9ce476b6e5d901eb" UNIQUE ("user_id"), CONSTRAINT "PK_caf1d3cd103cd3ace357b7788e3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_ae12df020e2f1e064e5cd95e00" ON "technical_managers" ("document") `,
    );
    await queryRunner.query(
      `ALTER TABLE "technical_managers" ADD CONSTRAINT "FK_1372e68e6f9ce476b6e5d901ebb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "technical_managers" ADD CONSTRAINT "FK_329babebc549d05acf0fd868e96" FOREIGN KEY ("cost_center_id") REFERENCES "cost_centers"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "technical_managers" DROP CONSTRAINT "FK_329babebc549d05acf0fd868e96"`,
    );
    await queryRunner.query(
      `ALTER TABLE "technical_managers" DROP CONSTRAINT "FK_1372e68e6f9ce476b6e5d901ebb"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ae12df020e2f1e064e5cd95e00"`,
    );
    await queryRunner.query(`DROP TABLE "technical_managers"`);
  }
}
