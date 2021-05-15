import { Controller, Post } from '@nestjs/common';
import { AuthPostingService } from './auth-posting.service';

@Controller('auth-posting')
export class AuthPostingController {
	constructor (
		private readonly a_pService: AuthPostingService
	) {}

	@Post()
	makePosting() {

	}
}
