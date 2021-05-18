import { Injectable } from '@nestjs/common';
import { Tree } from '../entities/trees.entity'
import { trees } from '../entities/trees'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TreeService {
	constructor (
		@InjectRepository(Tree)
		private treeRepository: Repository<Tree>
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
		
	}
}
