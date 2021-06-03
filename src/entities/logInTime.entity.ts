import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class LoginTime {
    @PrimaryGeneratedColumn('uuid')
    loginId: string;

    @Column()
    hostId: string;

    @CreateDateColumn({type: "timestamp"})
    signUpDate: Date;

    @UpdateDateColumn({type: "timestamp"})
    nowDate: Date

    @Column({type: "timestamp"})
    lastDate: Date
}