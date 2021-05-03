import {MigrationInterface, QueryRunner} from "typeorm";

export class init1620000668447 implements MigrationInterface {
    name = 'init1620000668447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shoppingCart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" uuid NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedBy" uuid NOT NULL, "internalComment" character varying(300), "userId" uuid NOT NULL, CONSTRAINT "UQ_2b83783dd39f3ca91fde23ac661" UNIQUE ("userId"), CONSTRAINT "PK_af06329ccd9c07a646d102844c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" uuid NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedBy" uuid NOT NULL, "internalComment" character varying(300), "productId" uuid NOT NULL, "price" numeric(5,2) NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "cartId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_2ca008a558fe6002e3309f8f1d7" FOREIGN KEY ("cartId") REFERENCES "shoppingCart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_2ca008a558fe6002e3309f8f1d7"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "shoppingCart"`);
    }

}
