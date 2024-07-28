import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFormsTable1722195760162 implements MigrationInterface {
  name = 'CreateFormsTable1722195760162';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "forms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "cost_center_id" uuid NOT NULL, CONSTRAINT "PK_ba062fd30b06814a60756f233da" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_bfa904bc8c5ad6bcb28e488e25" ON "forms" ("title") `,
    );
    await queryRunner.query(
      `ALTER TABLE "forms" ADD CONSTRAINT "FK_ff1f7713a1eeccc2e5d0e022857" FOREIGN KEY ("cost_center_id") REFERENCES "cost_centers"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "forms" DROP CONSTRAINT "FK_ff1f7713a1eeccc2e5d0e022857"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bfa904bc8c5ad6bcb28e488e25"`,
    );
    await queryRunner.query(`DROP TABLE "forms"`);
  }
}
