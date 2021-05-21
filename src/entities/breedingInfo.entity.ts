import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class BreedingInfo {
    @PrimaryGeneratedColumn('uuid')
    breadId: string;

	@Column()
	userCode: string;

    @Column({default: ''})
    treeCode: string;

	@Column({default: '0'})
    treeExp: string;

    @Column({default: '1'})
    treeLevel: string;
}