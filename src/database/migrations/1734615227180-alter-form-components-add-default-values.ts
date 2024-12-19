import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterFormComponentsAddDefaultValues1734615227180
  implements MigrationInterface
{
  name = 'AlterFormComponentsAddDefaultValues1734615227180';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "form_components" ADD "max_value" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "form_components" ADD "min_value" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "form_components" ADD "radio_list_true_value" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "form_components" ADD "checkbox_list_true_value_index" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "executions" ADD "accordingly" boolean DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "executions" DROP COLUMN "accordingly"`,
    );
    await queryRunner.query(
      `ALTER TABLE "form_components" DROP COLUMN "checkbox_list_true_value_index"`,
    );
    await queryRunner.query(
      `ALTER TABLE "form_components" DROP COLUMN "radio_list_true_value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "form_components" DROP COLUMN "min_value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "form_components" DROP COLUMN "max_value"`,
    );
  }
}
