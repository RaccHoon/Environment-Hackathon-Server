import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1622561398558 implements MigrationInterface {
    name = 'migration1622561398558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `picture`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `picture` longtext NOT NULL");
    }

}
