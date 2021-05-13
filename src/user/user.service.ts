import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptionService } from '../encryption/encryption.service'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private readonly encrypSer: EncryptionService
	) {}

	async signIn(eMail: string): Promise<User | undefined> {
		return this.userRepository.findOne({'eMail': eMail});
	}

	async signUp(userInformation: User): Promise<void> {
		userInformation.password = await this.encrypSer.makeSault();
		await this.userRepository.insert(userInformation);
	}
}
