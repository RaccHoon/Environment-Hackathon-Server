import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1621617570432 implements MigrationInterface {
    name = 'migration1621617570432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `auth_support_people` (`authId` varchar(36) NOT NULL, `contentId` varchar(255) NOT NULL, `ownerCode` varchar(255) NOT NULL, `visiterCode` varchar(255) NOT NULL, PRIMARY KEY (`authId`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `auth_support_people`");
    }

}
