import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1621593684199 implements MigrationInterface {
    name = 'migration1621593684199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `authNum`");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `authNum` varchar(255) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `pictureNum`");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `pictureNum` varchar(255) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `breeding_info` DROP COLUMN `treeExp`");
        await queryRunner.query("ALTER TABLE `breeding_info` ADD `treeExp` varchar(255) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `breeding_info` DROP COLUMN `treeLevel`");
        await queryRunner.query("ALTER TABLE `breeding_info` ADD `treeLevel` varchar(255) NOT NULL DEFAULT '1'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `breeding_info` DROP COLUMN `treeLevel`");
        await queryRunner.query("ALTER TABLE `breeding_info` ADD `treeLevel` int NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `breeding_info` DROP COLUMN `treeExp`");
        await queryRunner.query("ALTER TABLE `breeding_info` ADD `treeExp` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `pictureNum`");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `pictureNum` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `authNum`");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `authNum` int NOT NULL DEFAULT '0'");
    }

}
