import { Injectable } from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptionService } from '../encryption/encryption.service'
import { TreeService } from '../tree/tree.service'
import { BreedingInfo } from '../entities/breedingInfo.entity'
import { Tree } from '../entities/trees.entity'
import { quests } from '../entities/quest'
import { LoginTime } from '../entities/logInTime.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,

		@InjectRepository(BreedingInfo)
		private breedingInfoRepository: Repository<BreedingInfo>,

		@InjectRepository(LoginTime)
		private loginTimeRepository: Repository<LoginTime>,

		@InjectRepository(Tree)
		private treeInfoRepository: Repository<Tree>,

		private readonly encrypSer: EncryptionService,
		private readonly treeService: TreeService
	) {}

	async signIn(eMail: string): Promise<User | undefined> {
		return this.userRepository.findOne({'eMail': eMail});
	}

	async checkOneDayPassed(eMail: string) {
		let user = await this.userRepository.findOne({eMail: eMail})
		if(user) {
			console.log("여기는 됨")
			let lastTime = await this.loginTimeRepository.findOne({hostId: user.userClassification})

			console.log(lastTime)

			await this.loginTimeRepository.update({hostId: user.userClassification}, {lastDate: lastTime.nowDate})
			lastTime = await this.loginTimeRepository.findOne({hostId: user.userClassification})

			let lastDate = lastTime.lastDate.getTime() + (1000*60*60*18)
			console.log(lastDate)
			lastDate = Math.floor(lastDate/(1000*60*2*1))

			console.log(lastTime.nowDate)

			let nowDate = lastTime.nowDate.getTime() + (1000*60*60*18)// + (1000*60*60*4)
			console.log(nowDate)
			nowDate = Math.floor(nowDate/(1000*60*2*1))
			console.log(lastDate)
			console.log(nowDate)

			if(nowDate>lastDate) {
				console.log("True")
				await this.setThreeQuests(user.userClassification)
			}
			else
				console.log("False")
		}
	}

	async signUp(userInformation): Promise<void> {
		if(await this.noSameEmail(userInformation.eMail) == 'true') {
			userInformation.password = await this.encrypSer.makeSault(userInformation.password);
			await this.userRepository.insert(userInformation);
			const userCode = (await this.userRepository.findOne({'eMail': userInformation.eMail})).userClassification

			const createdTime = {
				hostId: userCode,
				lastDate: "00"
			}
			await this.loginTimeRepository.insert(createdTime)
			let signUpDate = (await this.loginTimeRepository.findOne({hostId: userCode})).signUpDate
			await this.loginTimeRepository.update({hostId: userCode}, {lastDate: signUpDate})
			await this.setThreeQuests(userCode);
/*			
			await this.treeService.makeTreeInfo(userCode)
			await this.breedingInfoRepository.insert({userCode: userCode})*/
		}
	}
	
	async getUserInfo(userClassification: string) {
		return await this.userRepository.findOne({userClassification: userClassification});
	}

	async noSameEmail(email: string) {
		const connection = getConnection()
		const users: Array<User> = await connection
			.createQueryBuilder()
			.select("user.eMail")
			.from(User, 'user')
			.getMany()
		
		if(users.find((value)=>value.eMail === email))
			return "false"

		else
			return "true"
	}

	async noSameName(name: string) {
		const connection = getConnection()
		const users: Array<User> = await connection
			.createQueryBuilder()
			.select("user.name")
			.from(User, 'user')
			.getMany()
		
		if(users.find((value)=>value.name === name))
			return "false"

		else
			return "true"
	}

	async returnAllRankings() {
		return await this.userRepository.findAndCount({
            order: {
                exp: 'DESC'
                },
            take: 100
        })
	}

	async returnMyRanking(user) {
		const users = await this.userRepository.findAndCount({
            order: {
                exp: 'DESC'
                }
        })
		let i = 0

		for(i; i<users[1]; i++) {
			if(users[0][i].userClassification === user.userId) {
				break
			}
		}

		return {
			'ranking': i+1,
			'name': users[0][i].name,
			'exp': users[0][i].exp,
			'token': users[0][i].token,
			'image': users[0][i].image
		}
	}

	async deleteAll() {
		await this.userRepository.delete({})
		await this.treeInfoRepository.delete({})
		await this.breedingInfoRepository.delete({})
	}
/*
	async checkDust(items, user) {
		const thisUser = await this.userRepository.findOne({userClassification: user})
		let gradeSum = 0
		let lacationNum = 0
		for(let item of items) {
			if(item.sidoName === thisUser.location){
				gradeSum += Number(item.pm10Grade)
				lacationNum++
			}
		}
		if((gradeSum / lacationNum) < 2) {
			return 'good'
		}
		else if((gradeSum / lacationNum) >= 2) {
			return 'bad'
		}
	}*/

	async setThreeQuests(user) {
		const len = quests.length
		let choosenNum = []
		let impossibleNum = []
		/*
		if(await this.checkDust(items, user) == 'good')
			impossibleNum.push(8)
		else
			impossibleNum.push(9)*/

		while(choosenNum.length < 3) {
			const num = Math.floor(Math.random()*len)
			if(choosenNum.includes(num))
				continue
			if(impossibleNum.includes(num))
				continue
			else
				choosenNum.push(num)
		}
		await this.userRepository.update({userClassification: user}, {firstQuest: choosenNum[0]})
		await this.userRepository.update({userClassification: user}, {secondQuest: choosenNum[1]})
		await this.userRepository.update({userClassification: user}, {thirdQuest: choosenNum[2]})
	}

	async giveThreeQuests(user) {
		const thisUser = await this.userRepository.findOne({userClassification: user.userId})
		return {
			firstQuest: quests[thisUser.firstQuest],
			secondQuest: quests[thisUser.secondQuest],
			thirdQuest: quests[thisUser.thirdQuest],
		}
	}

	async isNewCommer(user) {
		const thisUser = await this.userRepository.findOne({userClassification: user.userId})
		if(thisUser.newCommer === 'true'){
			await this.userRepository.update({userClassification: user.userId}, {newCommer: 'false'})
			return {'result': 'true'}
		}
		return {'result': 'false'}
	}

	async giveProfile(user) {
		const thisUser = await this.userRepository.findOne({"userClassification": user.userId})
		return {
			"profile": thisUser.image,
			"name": thisUser.name
		}
	}
}
