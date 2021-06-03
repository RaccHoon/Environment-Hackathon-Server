import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1622625935485 implements MigrationInterface {
    name = 'migration1622625935485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `firstQuestAuth`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `secondQuestAuth`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `thirdQuestAuth`");
        await queryRunner.query("ALTER TABLE `user` ADD `firstQuestPostingId` varchar(255) NOT NULL DEFAULT ''");
        await queryRunner.query("ALTER TABLE `user` ADD `secondQuestPostingId` varchar(255) NOT NULL DEFAULT ''");
        await queryRunner.query("ALTER TABLE `user` ADD `thirdQuestPostingId` varchar(255) NOT NULL DEFAULT ''");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `thirdQuestPostingId`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `secondQuestPostingId`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `firstQuestPostingId`");
        await queryRunner.query("ALTER TABLE `user` ADD `thirdQuestAuth` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `user` ADD `secondQuestAuth` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `user` ADD `firstQuestAuth` int NOT NULL DEFAULT '0'");
    }

}
