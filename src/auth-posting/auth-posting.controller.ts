import { Body, Controller, Post, UseGuards, Request, Get, Query, Param, Delete, Patch } from '@nestjs/common';
import { AuthPostingService } from './auth-posting.service';
import { AuthPosting } from '../entities/authPosting.entity'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostingInfo } from '../entities/postingInfo'
import { Picture } from '../entities/picture.entity'

@Controller('auth-posting')
export class AuthPostingController {
	constructor (
		private readonly a_pService: AuthPostingService
	) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async makePosting(@Request() req, @Body() postingInfo) {
		const id = await this.a_pService.makePosting(postingInfo, await req.user);
		return {
			id: id
		}
	}

	@Get('postings/:id')
	async getInfo(@Param('id') id: string)  {
		return await this.a_pService.getInfo(id)
	}

	@Get('postings/:type/:index')
	async getPostings(@Param('type') type: string, @Param('index') index: number): Promise<PostingInfo> {
		const postingArr = await this.a_pService.getPostings(type, index);
		const postingInfo: PostingInfo = {
			postings: postingArr,
			num: postingArr.length
		}
		return postingInfo;
	}

	@Get('pictures/:postingId')
	async giveImage(@Param('postingId') postingId) {
		const pictures = await this.a_pService.giveImage(postingId)
		console.log('aa' + pictures[0].image)
		return {
			pictures: pictures,
			num: pictures.length
		}
	}

	@Get('userProfile/:postingId')
	async giveUserProfile(@Param('postingId') postingId) {
		return {'profile': await this.a_pService.giveUserProfile(postingId)}
	}

	@UseGuards(JwtAuthGuard)
	@Get('validation/:ownerCode/:contentId')
	async validatedByOthers(@Request() req, @Param('ownerCode') ownerCode: string, @Param('contentId') contentId: string) {
		return await this.a_pService.validatedByOthers(req.user, ownerCode, contentId)
	}

	@Delete('deleteAll')
	async deleteAll() {
		await this.a_pService.deleteAll();
	}
	
	@Post('/image')
	async saveImage(@Body() imageInfo) {
		console.log("이미지: " + imageInfo.postingId, imageInfo.image)
		await this.a_pService.saveImage(await imageInfo)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/myPostings/:index')
	async giveUserPostings(@Request() req, @Param('index') index) {
		const postings = await this.a_pService.giveUserPostings(req.user, index)
		const myPosting = {
			postings: postings,
			num: postings.length
		}
		return myPosting
	}
}
