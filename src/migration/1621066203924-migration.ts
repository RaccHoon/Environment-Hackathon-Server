import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1621066203924 implements MigrationInterface {
    name = 'migration1621066203924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `auth_posting` (`questName` varchar(36) NOT NULL, `postTitle` varchar(255) NOT NULL, `postContent` longtext NOT NULL, `picture` varchar(255) NOT NULL, `data` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `writerCode` varchar(255) NOT NULL, `authNum` int NOT NULL, `pictureNum` int NOT NULL, `reviewNum` int NOT NULL, PRIMARY KEY (`questName`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `auth_posting`");
    }

}
