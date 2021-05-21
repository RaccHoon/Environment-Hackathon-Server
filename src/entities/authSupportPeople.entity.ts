import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthSupportPeople {
    @PrimaryGeneratedColumn('uuid')
    authId: string;

	@Column()
    contentId: string;

	@Column()
	ownerCode: string;

	@Column()
    visiterCode: string;
}