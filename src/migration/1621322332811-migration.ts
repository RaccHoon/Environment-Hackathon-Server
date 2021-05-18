import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1621322332811 implements MigrationInterface {
    name = 'migration1621322332811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `auth_posting` ADD `writerName` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `auth_posting` DROP COLUMN `writerName`");
    }

}
