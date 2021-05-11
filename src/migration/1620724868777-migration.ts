import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1620724868777 implements MigrationInterface {
    name = 'migration1620724868777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`userClassification` varchar(36) NOT NULL, `eMail` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `location` varchar(255) NOT NULL, PRIMARY KEY (`userClassification`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `user`");
    }

}
