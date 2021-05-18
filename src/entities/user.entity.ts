import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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

    @Column()
    location: string;

    @Column({default: 0})
    exp: number;

    @Column({default: 50})
    token: number;
}