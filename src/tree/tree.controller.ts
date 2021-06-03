import { Controller, Request, Post, UseGuards, Get, Delete, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TreeService } from './tree.service'

@Controller('tree')
export class TreeController {
	constructor(
		private readonly treeService: TreeService,
	) {}

	@UseGuards(JwtAuthGuard)
	@Get('/breeding')
	async userBreedingTree(@Request() req) {
		console.log(await this.treeService.userBreedingTree(req.user))
		return await this.treeService.userBreedingTree(req.user);
	}

	@Delete('/deleteAll')
	async deleteAll() {
		this.treeService.deleteAll();
	}
}
