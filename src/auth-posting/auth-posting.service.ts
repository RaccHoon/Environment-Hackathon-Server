import { Injectable } from '@nestjs/common';
import { AuthPosting } from '../entities/authPosting.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { User } from '../entities/user.entity'

@Injectable()
export class AuthPostingService {
	constructor (
		@InjectRepository(User)
		private userRepository: Repository<User>,

		@InjectRepository(AuthPosting)
		private postingRepository: Repository<AuthPosting>,

		private readonly userService: UserService
	) {}

	async makePosting(postingInfo: AuthPosting, user): Promise<void> {
		postingInfo.writerCode = user.userId;
		postingInfo.writerName = (await this.userService.getUserInfo(user.userId)).name
		await this.postingRepository.insert(postingInfo);
	}

	async getPostings(type: string, index: number) {
		if(type === 'any') {
			return await this.postingRepository.find({
				order: {
					date: 'DESC'
					},
				skip: (index-1)*20,
				take: 20,
			})
		}

		else if(type === 'unAuth') {
			return await this.postingRepository.find({
				order: {
					date: 'DESC'
					},
				skip: (index-1)*20,
				take: 20,
				where: {
					"type": 'unAuth'
				}
			})
		}

		else {
			return null;
		}
	}

	async deleteAll() {
		await this.postingRepository.delete({});
	}
}
