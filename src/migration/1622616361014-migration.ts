import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1622616361014 implements MigrationInterface {
    name = 'migration1622616361014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `login_time` (`loginId` varchar(36) NOT NULL, `hostId` varchar(255) NOT NULL, `signUpDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `nowDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `lastDate` timestamp NOT NULL, PRIMARY KEY (`loginId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `lastDate`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `nowDate`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `signUpDate`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `signUpDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user` ADD `nowDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user` ADD `lastDate` timestamp NOT NULL");
        await queryRunner.query("DROP TABLE `login_time`");
    }

}
