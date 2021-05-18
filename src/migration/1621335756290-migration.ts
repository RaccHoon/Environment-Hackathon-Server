import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1621335756290 implements MigrationInterface {
    name = 'migration1621335756290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `id` varchar(36) NOT NULL PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `questName`");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `questName` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `questName`");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `questName` varchar(36) NOT NULL");
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `id` varchar(36) NOT NULL");
    }

}
