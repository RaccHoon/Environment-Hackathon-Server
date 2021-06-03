import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1622558177077 implements MigrationInterface {
    name = 'migration1622558177077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `breeding_info` ADD `breadId` varchar(36) NOT NULL PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `breeding_info` ADD `userCode` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `breeding_info` ADD `treeCode` varchar(255) NOT NULL DEFAULT ''");
        await queryRunner.query("ALTER TABLE `breeding_info` ADD `treeExp` varchar(255) NOT NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `breeding_info` DROP COLUMN `treeExp`");
        await queryRunner.query("ALTER TABLE `breeding_info` DROP COLUMN `treeCode`");
        await queryRunner.query("ALTER TABLE `breeding_info` DROP COLUMN `userCode`");
        await queryRunner.query("ALTER TABLE `breeding_info` DROP COLUMN `breadId`");
    }

}
