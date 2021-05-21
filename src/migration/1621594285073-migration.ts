import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1621594285073 implements MigrationInterface {
    name = 'migration1621594285073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `exp`");
        await queryRunner.query("ALTER TABLE `user` ADD `exp` varchar(255) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `token`");
        await queryRunner.query("ALTER TABLE `user` ADD `token` varchar(255) NOT NULL DEFAULT '50'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `token`");
        await queryRunner.query("ALTER TABLE `user` ADD `token` int NOT NULL DEFAULT '50'");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `exp`");
        await queryRunner.query("ALTER TABLE `user` ADD `exp` int NOT NULL DEFAULT '0'");
    }

}
