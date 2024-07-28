import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFormComponentsTable1722195968226
  implements MigrationInterface
{
  name = 'CreateFormComponentsTable1722195968226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."form_components_type_enum" AS ENUM('number', 'text', 'checkbox_list', 'radio_list', 'date', 'upload')`,
    );
    await queryRunner.query(
      `CREATE TABLE "form_components" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "subtitle" character varying, "type" "public"."form_components_type_enum" NOT NULL, "form_id" uuid NOT NULL, CONSTRAINT "PK_4fa78917422bd86e5ddd4796707" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "form_components" ADD CONSTRAINT "FK_6c49e9848e89f09368de318d52c" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "form_components" DROP CONSTRAINT "FK_6c49e9848e89f09368de318d52c"`,
    );
    await queryRunner.query(`DROP TABLE "form_components"`);
    await queryRunner.query(`DROP TYPE "public"."form_components_type_enum"`);
  }
}
