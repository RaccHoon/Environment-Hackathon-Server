import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Picture {
    @PrimaryGeneratedColumn('uuid')
    pictureId: string;

    @Column()
    postingId: string;

    @Column({"type": "longtext"})
    image: string;

    @CreateDateColumn({type: "timestamp"})
    createdDate: Date;
}