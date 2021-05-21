import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1621609342822 implements MigrationInterface {
    name = 'migration1621609342822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `image` longtext NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `image`");
    }

}
