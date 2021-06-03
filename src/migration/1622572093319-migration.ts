import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1622572093319 implements MigrationInterface {
    name = 'migration1622572093319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `firstQuest` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `user` ADD `secondQuest` int NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `user` ADD `thirdQuest` int NOT NULL DEFAULT '2'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `thirdQuest`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `secondQuest`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `firstQuest`");
    }

}
