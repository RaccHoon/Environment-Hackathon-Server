import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}