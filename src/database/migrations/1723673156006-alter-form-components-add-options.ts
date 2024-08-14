import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterFormComponentsAddOptions1723673156006 implements MigrationInterface {
    name = 'AlterFormComponentsAddOptions1723673156006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_components" ADD "options" character varying array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_components" DROP COLUMN "options"`);
    }

}
