import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class AuthPosting {
    @PrimaryGeneratedColumn('uuid')
    questName: string;

    @Column()
    postTitle: string;

    @Column({type: "longtext"})
    postContent: string;

    @Column()
    picture: string;

	@CreateDateColumn()
    data: string;

	@Column()
    writerCode: string;

	@Column()
    authNum: number;

	@Column()
    pictureNum: number;
	
	@Column()
    reviewNum: number;
}