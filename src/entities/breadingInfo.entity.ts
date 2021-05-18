import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class AuthPosting {
    @PrimaryGeneratedColumn('uuid')
    breadId: string;

	@Column()
	userCode: string;

    @Column({default: ''})
    treeCode: string;

	@Column({default: 0})
    treeExp: number;
}