import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userClassification: string;

    @Column()
    eMail: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({"type": "longtext"})
    image: string;

    @Column({default: 0})
    firstQuest: number;

    @Column({default: ""})
    firstQuestPostingId: string;

    @Column({default: 1})
    secondQuest: number

    @Column({default: ""})
    secondQuestPostingId: string;

    @Column({default: 2})
    thirdQuest: number

    @Column({default: ""})
    thirdQuestPostingId: string;

    @Column()
    location: string;

    @Column({default: '0'})
    exp: string;

    @Column({default: '50'})
    token: string;

    @Column({default: 'true'})
    newCommer: string;
}