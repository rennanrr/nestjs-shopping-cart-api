import {MigrationInterface, QueryRunner} from "typeorm";

export class init1620056686053 implements MigrationInterface {
    name = 'init1620056686053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_16e3f6169e7c450d0b7a7ba876b"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "id_cart" TO "cartId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_2ca008a558fe6002e3309f8f1d7" FOREIGN KEY ("cartId") REFERENCES "shoppingCart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_2ca008a558fe6002e3309f8f1d7"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "cartId" TO "id_cart"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_16e3f6169e7c450d0b7a7ba876b" FOREIGN KEY ("id_cart") REFERENCES "shoppingCart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
