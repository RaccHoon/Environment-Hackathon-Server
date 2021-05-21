import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1621410075074 implements MigrationInterface {
    name = 'migration1621410075074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `picture` longtext NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `picture`");
    }

}
