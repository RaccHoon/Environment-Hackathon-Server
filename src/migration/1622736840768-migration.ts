import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1622736840768 implements MigrationInterface {
    name = 'migration1622736840768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `auth_posting` CHANGE `questName` `questName` varchar(255) NOT NULL DEFAULT ''");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `auth_posting` CHANGE `questName` `questName` varchar(255) NOT NULL");
    }

}
