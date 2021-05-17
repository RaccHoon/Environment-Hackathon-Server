import { Injectable } from '@nestjs/common';
import { AuthPosting } from '../entities/authPosting.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthPostingService {
	constructor (
		@InjectRepository(AuthPosting)
		private postingRepository: Repository<AuthPosting>
	) {}

	async makePosting(postingInfo: AuthPosting, user): Promise<void> {
		postingInfo.writerCode = user.userId;
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
}
