import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
	  private usersService: UserService,
	  private jwtService: JwtService
	  ) {}

  async validateUser(eMail: string, pass: string): Promise<any> {
    const user = await this.usersService.signIn(eMail);
    if (user &&  await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    await this.usersService.checkOneDayPassed(user.eMail)
    const payload = { username: user.eMail, sub: user.userClassification };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}