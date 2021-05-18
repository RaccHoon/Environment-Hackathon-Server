import { Injectable } from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptionService } from '../encryption/encryption.service'
import { TreeService } from '../tree/tree.service'
import { BreedingInfo } from '../entities/breedingInfo.entity'
import { Tree } from '../entities/trees.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,

		@InjectRepository(BreedingInfo)
		private breedingInfoRepository: Repository<BreedingInfo>,

		@InjectRepository(Tree)
		private treeInfoRepository: Repository<Tree>,

		private readonly encrypSer: EncryptionService,
		private readonly treeService: TreeService
	) {}

	async signIn(eMail: string): Promise<User | undefined> {
		return this.userRepository.findOne({'eMail': eMail});
	}

	async signUp(userInformation: User): Promise<void> {
		if(await this.noSameEmail(userInformation.eMail) == 'true') {
			userInformation.password = await this.encrypSer.makeSault(userInformation.password);
			await this.userRepository.insert(userInformation);
			const userCode = (await this.userRepository.findOne({'eMail': userInformation.eMail})).userClassification
			await this.treeService.makeTreeInfo(userCode)
			await this.breedingInfoRepository.insert({userCode: userCode})
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

	async deleteAll() {
		await this.userRepository.delete({})
		await this.treeInfoRepository.delete({})
		await this.breedingInfoRepository.delete({})
	}
}
