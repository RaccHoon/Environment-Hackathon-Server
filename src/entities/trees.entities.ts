import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class AuthPosting {
    @PrimaryGeneratedColumn('uuid')
    tableId: string;

    @Column()
    treeCode: string;

    @Column()
    treeName: string;

    @Column()
    userCode: string;

	@Column({default: 0})
    level: number;
}