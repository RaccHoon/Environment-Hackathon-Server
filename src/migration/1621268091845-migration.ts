import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1621268091845 implements MigrationInterface {
    name = 'migration1621268091845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `type` varchar(255) NOT NULL DEFAULT 'unAuth'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `type`");
    }

}
