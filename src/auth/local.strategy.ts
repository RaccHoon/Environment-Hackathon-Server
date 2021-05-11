import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SecureCode } from '../entities/secureCode';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email'});
  }

  async validate(secureInfo: SecureCode): Promise<any> {
    const user = await this.authService.validateUser(secureInfo);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}