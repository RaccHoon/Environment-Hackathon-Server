import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class AuthPosting {
    @PrimaryGeneratedColumn('uuid')
    postingId: string;

    @Column()
    questName: string;

    @Column({default: ""})
    postTitle: string;

    @Column({type: "longtext"})
    postContent: string;

    @Column({type: 'longtext'})
    picture: string;

	@CreateDateColumn({type: "timestamp"})
    date: string;

	@Column()
    writerCode: string;

    @Column()
    writerName: string;

	@Column({default: '0'})
    authNum: string;

	@Column({default: '0'})
    pictureNum: string;
	
	@Column({default: '0'})
    reviewNum: string;

    @Column({default: 'unAuth'})
    type: string;
}