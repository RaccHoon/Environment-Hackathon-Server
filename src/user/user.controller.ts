import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { SecureCode } from '../entities/secureCode';

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService
	){}

	@Post('/signUp')
	async signUp(@Body() userInformation: User): Promise<void> {
		this.userService.signUp(userInformation);
	}
}
