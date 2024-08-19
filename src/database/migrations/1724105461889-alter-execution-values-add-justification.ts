import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterExecutionValuesAddJustification1724105461889 implements MigrationInterface {
    name = 'AlterExecutionValuesAddJustification1724105461889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "execution_values" ADD "justification" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "execution_values" DROP COLUMN "justification"`);
    }

}
