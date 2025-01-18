import { MigrationInterface, QueryRunner } from 'typeorm';

export class Product1737141705283 implements MigrationInterface {
  name = 'Product1737141705283';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" text NOT NULL, "sku" text NOT NULL, "name" text NOT NULL, "brand" text NOT NULL, "model" text NOT NULL, "category" text NOT NULL, "color" text NOT NULL, "price" double precision NOT NULL, "currency" text NOT NULL, "stock" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
