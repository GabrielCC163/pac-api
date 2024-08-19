import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterFormComponentsAddInsertJustification1724105259617 implements MigrationInterface {
    name = 'AlterFormComponentsAddInsertJustification1724105259617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_components" ADD "insertJustification" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_components" DROP COLUMN "insertJustification"`);
    }

}
