import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class AuthPosting {
    @PrimaryGeneratedColumn('uuid')
    questName: string;

    @Column({default: ""})
    postTitle: string;

    @Column({type: "longtext"})
    postContent: string;

    @Column({default: ""})
    picture: string;

	@CreateDateColumn({type: "timestamp"})
    date: string;

	@Column()
    writerCode: string;

	@Column({default: 0})
    authNum: number;

	@Column({default: 0})
    pictureNum: number;
	
	@Column({default: 0})
    reviewNum: number;

    @Column({default: 'unAuth'})
    type: string;
}