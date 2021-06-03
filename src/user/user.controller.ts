import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService
	){}

	@Post('/signUp')
	async signUp(@Body() userInformation): Promise<void> {
		await this.userService.signUp(userInformation);
	}

	@Delete('/deleteAll')
	async deleteAll(): Promise<void> {
		this.userService.deleteAll()
	}

	@UseGuards(JwtAuthGuard)
	@Get('/userProfile')
	async giveProfile(@Request() req) {
		return await this.userService.giveProfile(req.user)
	}

	@Get('/validation/email/:email')
	async noSameEmail(@Param('email') email: string): Promise<string> {
		return this.userService.noSameEmail(email)
	}

	@Get('/validation/name/:name')
	async noSameName(@Param('name') name: string): Promise<string> {
		return this.userService.noSameName(name)
	}

	@Get('/ranking')
	async returnAllRankings() {
		const rankingUsers = await this.userService.returnAllRankings()
		const rankArr = []
		for(let i=0; i<rankingUsers[1]; i++) {
			const rankObj = {
				'rank': i+1,
				'name': rankingUsers[0][i].name,
				'exp': rankingUsers[0][i].exp
			}
			rankArr[i] = rankObj
		}
		const allRanking = {
			'ranking':rankArr,
			'totalNum':rankingUsers[1]
		}
		return allRanking
	}

	@UseGuards(JwtAuthGuard)
	@Get('/ranking/myRanking')
	async returnMyRanking(@Request() req) {
		return await this.userService.returnMyRanking(await req.user)
	}

	@UseGuards(JwtAuthGuard)
	@Get("/myQuest")
	async giveThreeQuests(@Request() req) {
		const quests = await this.userService.giveThreeQuests(req.user)
		quests.firstQuest['auth'] = "unAuth"
		quests.secondQuest['auth'] = "unAuth"
		quests.thirdQuest['auth'] = "unAuth"
		return quests
	}

	@UseGuards(JwtAuthGuard)
	@Get("/newCommer")
	async isNewCommer(@Request() req) {
		return await this.userService.isNewCommer(req.user)
	}


}
