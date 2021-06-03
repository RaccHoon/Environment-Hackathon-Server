import { Injectable, Post } from '@nestjs/common';
import { AuthPosting } from '../entities/authPosting.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { User } from '../entities/user.entity'
import { AuthSupportPeople } from '../entities/authSupportPeople.entity'
import { BreedingInfo } from '../entities/breedingInfo.entity'
import { Picture } from '../entities/picture.entity'
import { quests } from '../entities/quest'

@Injectable()
export class AuthPostingService {
	constructor (
		@InjectRepository(User)
		private userRepository: Repository<User>,

		@InjectRepository(AuthPosting)
		private postingRepository: Repository<AuthPosting>,

		@InjectRepository(AuthSupportPeople)
		private authSupportedPeopleRepository: Repository<AuthSupportPeople>,

		@InjectRepository(BreedingInfo)
		private breedingInfoRepository: Repository<BreedingInfo>,

		@InjectRepository(Picture)
		private pictureRepository: Repository<Picture>,

		private readonly userService: UserService
	) {}

	async makePosting(postingInfo, user) {
		const newPosting = {
			questName: postingInfo.questName,
			postTitle: postingInfo.postTitle,
			postContent: postingInfo.postContent,
		}
		newPosting['writerCode'] = user.userId;
		newPosting['writerName'] = (await this.userService.getUserInfo(user.userId)).name

		await this.postingRepository.insert(newPosting);
		const posting = (await this.postingRepository.find({
			order: {
				date: 'DESC'
				},
			take: 1,
			where: {
				"writerCode": newPosting['writerCode'],
				"postTitle": newPosting.postTitle
			}
		}))[0]
		
		if(postingInfo.mission == 'first') {
			await this.userRepository.update({userClassification: user.userId}, {firstQuestPostingId: posting.postingId})
		}

		else if(postingInfo.mission == 'second') {
			await this.userRepository.update({userClassification: user.userId}, {secondQuestPostingId: posting.postingId})
		}

		else if(postingInfo.mission == 'third') {
			await this.userRepository.update({userClassification: user.userId}, {thirdQuestPostingId: posting.postingId})
		}

		return posting.postingId
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

	async validatedByOthers(user, ownerCode: string, contentId: string) {
		if(ownerCode === user.userId)
			return {response: "스스로 자신의 글을 인증할 수 없습니다"}
		if(await this.authSupportedPeopleRepository.findOne({ownerCode: ownerCode, contentId: contentId, visiterCode: user.userId}))
			return {response: "같은 글을 2회 이상 인증할 수 없습니다"}
		else {
			const targetPosting = await this.postingRepository.findOne({postingId: contentId})
			const newAuthNum = (Number(targetPosting.authNum) + 1) + ""
			await this.giveSupportedUserToken(user)
			await this.postingRepository.update({postingId: contentId}, {authNum: newAuthNum})
			const supporter = {
				contentId: contentId,
				ownerCode: ownerCode,
				visiterCode: user.userId
			}
			await this.authSupportedPeopleRepository.insert(supporter)
			if(Number(newAuthNum) >= 3 && targetPosting.type === "unAuth") {
				await this.postingRepository.update({postingId: contentId}, {type: 'auth'})
				await this.giveUserToken(contentId)
			}
			return {response: "처리되었습니다"}

		}
			
	}

	async giveSupportedUserToken(user) {
		const owner = await this.userRepository.findOne({userClassification: user.userId})
		const newExp = (Number(owner.exp) + 10) + ""
		await this.userRepository.update({userClassification: user.userId}, {exp: newExp})
	}

	async giveUserToken(contentId) {
		let newExp
		const posting = await this.postingRepository.findOne({postingId: contentId})
		const user = await this.userRepository.findOne({userClassification: posting.writerCode})
		for(let item of quests) {
			if(item.questName === posting.questName) {
				newExp = (Number(user.exp) + item.point) + ""
				break
			}
		}		
		await this.userRepository.update({userClassification: user.userClassification}, {exp: newExp})
	}

	async giveTreeExp(user) {
		const tree = await this.breedingInfoRepository.update({userCode: user.userId}, {})
	}

	async deleteAll() {
		await this.postingRepository.delete({});
	}

	async saveImage(imageInfo) {
		console.log("이미지 저장" + imageInfo)
		console.log("이미지" + imageInfo.postingId)
		await this.pictureRepository.insert(imageInfo);
	}

	async giveImage(postingId) {
		return await this.pictureRepository.find({
			order: {
				createdDate: 'DESC'
				},
			take: 50,
			where: {
				"postingId": postingId
			}
		})
	}

	async giveUserProfile(postingId) {
		const posting = await this.postingRepository.findOne({postingId: postingId})
		const user = await this.userRepository.findOne({userClassification: posting.writerCode})
		return user.image
	}

	async giveUserPostings(user, index) {
		return await this.postingRepository.find({
			order: {
				date: 'DESC'
				},
			skip: (index-1)*20,
			take: 20,
			where: {
				"writerCode": user.userId
			}
		})
	}
}
