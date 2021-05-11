import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SecureCode } from '../entities/secureCode';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
	) {}

	async signIn(eMail: string): Promise<User | undefined> {
		return this.userRepository.findOne({'eMail': eMail});
	}

	async signUp(userInformation: User): Promise<void> {
		await this.userRepository.insert(userInformation);
	}
}
