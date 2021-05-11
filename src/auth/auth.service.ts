import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SecureCode } from '../entities/secureCode'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
	  private usersService: UserService,
	  private jwtService: JwtService
	  ) {}

  async validateUser(secureInfo: SecureCode): Promise<any> {
    const user = await this.usersService.signIn(secureInfo.email);
    if (user && user.password === secureInfo.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}