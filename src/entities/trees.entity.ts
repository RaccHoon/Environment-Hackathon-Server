import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Tree {
    @PrimaryGeneratedColumn('uuid')
    tableId: string;

    @Column({default: ""})
    treeCode: string;

    @Column({default: ""})
    treeName: string;

    @Column({default: ""})
    userCode: string;
}