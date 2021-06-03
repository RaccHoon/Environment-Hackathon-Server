import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1622624780148 implements MigrationInterface {
    name = 'migration1622624780148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `firstQuestAuth` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `user` ADD `secondQuestAuth` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `user` ADD `thirdQuestAuth` int NOT NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `thirdQuestAuth`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `secondQuestAuth`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `firstQuestAuth`");
    }

}
