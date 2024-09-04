import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterExecutionValuesAddAccordingly1725477849438
  implements MigrationInterface
{
  name = 'AlterExecutionValuesAddAccordingly1725477849438';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "execution_values" ADD "accordingly" boolean DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "execution_values" DROP COLUMN "accordingly"`,
    );
  }
}
