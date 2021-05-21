import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

	@Delete('/deleteAll')
	async deleteAll(): Promise<void> {
		this.userService.deleteAll()
	}

	@Get('validation/email/:email')
	async noSameEmail(@Param('email') email: string): Promise<string> {
		return this.userService.noSameEmail(email)
	}

	@Get('validation/name/:name')
	async noSameName(@Param('name') name: string): Promise<string> {
		return this.userService.noSameName(name)
	}

}
