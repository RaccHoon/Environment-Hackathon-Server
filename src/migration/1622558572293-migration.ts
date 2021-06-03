import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1622558572293 implements MigrationInterface {
    name = 'migration1622558572293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `picture` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `picture` DROP COLUMN `pictureID`");
        await queryRunner.query("ALTER TABLE `picture` DROP COLUMN `picture`");
        await queryRunner.query("ALTER TABLE `picture` ADD `pictureId` varchar(36) NOT NULL PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `picture` ADD `image` longtext NOT NULL");
        await queryRunner.query("ALTER TABLE `picture` DROP COLUMN `createdDate`");
        await queryRunner.query("ALTER TABLE `picture` ADD `createdDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `picture` DROP COLUMN `createdDate`");
        await queryRunner.query("ALTER TABLE `picture` ADD `createdDate` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `picture` DROP COLUMN `image`");
        await queryRunner.query("ALTER TABLE `picture` DROP COLUMN `pictureId`");
        await queryRunner.query("ALTER TABLE `picture` ADD `picture` longtext NOT NULL");
        await queryRunner.query("ALTER TABLE `picture` ADD `pictureID` varchar(36) NOT NULL");
        await queryRunner.query("ALTER TABLE `picture` ADD PRIMARY KEY (`pictureID`)");
    }

}
