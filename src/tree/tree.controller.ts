import { Controller, Request, Post, UseGuards, Get, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TreeService } from './tree.service'

@Controller('tree')
export class TreeController {
	constructor(
		private readonly treeService: TreeService,
	) {}

	@UseGuards(JwtAuthGuard)
	@Get('breeding')
	async userBreedingTree(@Request() req) {
		await this.treeService.userBreedingTree(req.user);
	}
}
