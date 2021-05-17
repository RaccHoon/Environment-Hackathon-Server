import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1621071138246 implements MigrationInterface {
    name = 'migration1621071138246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `auth_posting` CHANGE `picture` `picture` varchar(255) NOT NULL DEFAULT ''");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `auth_posting` CHANGE `picture` `picture` varchar(255) NOT NULL");
    }

}
