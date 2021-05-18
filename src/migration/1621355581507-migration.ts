import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1621355581507 implements MigrationInterface {
    name = 'migration1621355581507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `breeding_info` (`breadId` varchar(36) NOT NULL, `userCode` varchar(255) NOT NULL, `treeCode` varchar(255) NOT NULL DEFAULT '', `treeExp` int NOT NULL DEFAULT '0', PRIMARY KEY (`breadId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `postingId` varchar(36) NOT NULL PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `questName` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `postTitle` varchar(255) NOT NULL DEFAULT ''");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `postContent` longtext NOT NULL");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `picture` varchar(255) NOT NULL DEFAULT ''");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `writerCode` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `authNum` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `pictureNum` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `reviewNum` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `type` varchar(255) NOT NULL DEFAULT 'unAuth'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `type`");
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `reviewNum`");
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `pictureNum`");
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `authNum`");
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `writerCode`");
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `date`");
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `picture`");
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `postContent`");
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `postTitle`");
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `questName`");
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `postingId`");
        await queryRunner.query("DROP TABLE `breeding_info`");
    }

}
