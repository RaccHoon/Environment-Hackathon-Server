import { Injectable, Post } from '@nestjs/common';
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

	async getInfo(id: string) {
		const posting = await this.postingRepository.findOne({postingId: id})
		const writer = await this.userRepository.findOne({userClassification: posting.writerCode})
		const postingInfo = {
			questName: posting.questName,
			writerName: posting.writerName,
			writerPicture: writer.image,
			postTitle: posting.postTitle,
			picture: posting.picture,
			pictureNum: posting.pictureNum,
			postingContent: posting.postContent,
			authNum: posting.authNum,
			commentNum: posting.reviewNum,
			commentedUsers: {
				comment: [
					{
						name: "user1",
						picture: "abcde",
						comment: "hello world"
					},
					{
						name: "user2",
						picture: "abcdef",
						comment: "hellooo world"
					}
				],
				commentedUserNum: 2
			}			
		}
		return await postingInfo;
	}

	async deleteAll() {
		await this.postingRepository.delete({});
	}
}
