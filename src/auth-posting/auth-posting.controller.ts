import { Body, Controller, Post, UseGuards, Request, Get, Query, Param } from '@nestjs/common';
import { AuthPostingService } from './auth-posting.service';
import { AuthPosting } from '../entities/authPosting.entity'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('auth-posting')
export class AuthPostingController {
	constructor (
		private readonly a_pService: AuthPostingService
	) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async makePosting(@Request() req, @Body() postingInfo: AuthPosting): Promise<void> {
		await this.a_pService.makePosting(postingInfo, await req.user);
	}

	@Get('postings/:type/:index')
	async getPostings(@Param('type') type: string, @Param('index') index: number): Promise<AuthPosting[]> {
		return await this.a_pService.getPostings(type, index);
	}

}
