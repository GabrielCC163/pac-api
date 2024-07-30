import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExecutionValuesTable1722377494077
  implements MigrationInterface
{
  name = 'CreateExecutionValuesTable1722377494077';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "execution_values" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "execution_id" uuid NOT NULL, "form_component_id" uuid NOT NULL, "value" text NOT NULL, "note" text, "technical_manager_id" uuid, CONSTRAINT "PK_1a8e4731bb8b0a78a152cef8928" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "execution_values" ADD CONSTRAINT "FK_980eee5c1cfa05acf018ca952cc" FOREIGN KEY ("execution_id") REFERENCES "executions"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "execution_values" ADD CONSTRAINT "FK_b998514f00297a4df4c64ec68ac" FOREIGN KEY ("form_component_id") REFERENCES "form_components"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "execution_values" ADD CONSTRAINT "FK_0a45d9c3e121a0706f3d0eae3ab" FOREIGN KEY ("technical_manager_id") REFERENCES "technical_managers"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "execution_values" DROP CONSTRAINT "FK_0a45d9c3e121a0706f3d0eae3ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "execution_values" DROP CONSTRAINT "FK_b998514f00297a4df4c64ec68ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "execution_values" DROP CONSTRAINT "FK_980eee5c1cfa05acf018ca952cc"`,
    );
    await queryRunner.query(`DROP TABLE "execution_values"`);
  }
}
