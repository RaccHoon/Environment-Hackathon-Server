import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Tree {
    @PrimaryGeneratedColumn('uuid')
    tableId: string;

    @Column()
    treeCode: string;

    @Column()
    treeName: string;

    @Column()
    userCode: string;
}