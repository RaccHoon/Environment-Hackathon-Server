import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1621332340249 implements MigrationInterface {
    name = 'migration1621332340249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `tree` (`tableId` varchar(36) NOT NULL, `treeCode` varchar(255) NOT NULL, `treeName` varchar(255) NOT NULL, `userCode` varchar(255) NOT NULL, `level` int NOT NULL DEFAULT '0', PRIMARY KEY (`tableId`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `tree`");
    }

}
