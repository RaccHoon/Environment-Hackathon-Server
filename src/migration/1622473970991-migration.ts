import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1622473970991 implements MigrationInterface {
    name = 'migration1622473970991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `signUpDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user` ADD `nowDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user` ADD `lastDate` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `lastDate`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `nowDate`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `signUpDate`");
    }

}
