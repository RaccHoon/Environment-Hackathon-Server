import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1622739198780 implements MigrationInterface {
    name = 'migration1622739198780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `newCommer` varchar(255) NOT NULL DEFAULT 'true'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `newCommer`");
    }

}
