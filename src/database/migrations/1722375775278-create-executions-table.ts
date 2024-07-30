import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExecutionsTable1722375775278 implements MigrationInterface {
  name = 'CreateExecutionsTable1722375775278';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "executions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "form_id" uuid NOT NULL, "technician_id" uuid NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_703e64e0ef651986191844b7b8b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "executions" ADD CONSTRAINT "FK_60390da734da2d5e72b018b5328" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "executions" ADD CONSTRAINT "FK_4c3b15757023039578945f4f480" FOREIGN KEY ("technician_id") REFERENCES "technicians"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "executions" DROP CONSTRAINT "FK_4c3b15757023039578945f4f480"`,
    );
    await queryRunner.query(
      `ALTER TABLE "executions" DROP CONSTRAINT "FK_60390da734da2d5e72b018b5328"`,
    );
    await queryRunner.query(`DROP TABLE "executions"`);
  }
}
