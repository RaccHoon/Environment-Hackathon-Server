import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1621594024401 implements MigrationInterface {
    name = 'migration1621594024401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `reviewNum`");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `reviewNum` varchar(255) NOT NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `reviewNum`");
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `reviewNum` int NOT NULL DEFAULT '0'");
    }

}
