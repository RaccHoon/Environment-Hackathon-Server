import { Injectable } from '@nestjs/common';
import { Tree } from '../entities/trees.entity'
import { trees } from '../entities/trees'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BreedingInfo } from '../entities/breedingInfo.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class TreeService {
	constructor (
		@InjectRepository(Tree)
		private treeRepository: Repository<Tree>,

		@InjectRepository(BreedingInfo)
		private breedingInfoRepository: Repository<BreedingInfo>,

		@InjectRepository(BreedingInfo)
		private userRepository: Repository<User>,
	){}

	async makeTreeInfo(userCode: string) {
		for(const tree of trees) {
			const treeInfo = {
				treeCode: tree.code,
				treeName: tree.name,
				userCode: userCode
			}
			await this.treeRepository.insert(treeInfo)
		}
	}

	async userBreedingTree(user) {
		const breedInfo = await this.breedingInfoRepository.findOne({userCode: user.userId})
		let treeInfo = undefined
		for(const tree of trees) {
			if(tree.code === breedInfo.treeCode) {
				treeInfo = tree
				break
			}
		}
		
		if(treeInfo == undefined) {
			const userNowBreeding = {
				treeName: "",
				treeExp: '0',
				treeLevel: '0',
				maxExp: '100',
				maxLevel: '0',
				userExp: '0',
				userToken: '0'
			}
			return userNowBreeding
		}

		const userInfo = await this.userRepository.findOne({userClassification: user.userId})
		const userNowBreeding = {
			treeName: treeInfo.treeName,
			treeExp: breedInfo.treeExp,
			treeLevel: breedInfo.treeLevel,
			maxExp: treeInfo.maxExp,
			maxLevel: treeInfo.maxLevel,
			userExp: userInfo.exp,
			userToken: userInfo.token
		}
		return userNowBreeding
	}
}
