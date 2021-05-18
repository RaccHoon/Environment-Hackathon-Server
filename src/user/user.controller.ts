import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { get } from 'http';

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService
	){}

	@Post('/signUp')
	async signUp(@Body() userInformation: User): Promise<void> {
		this.userService.signUp(userInformation);
	}

	@Get('/:email')
	async noSameEmail(@Param('email') email: string): Promise<string> {
		return this.userService.noSameEmail(email)
	}
}
