import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}
  getHello(): string {
    return 'Hello World!';
  }

  async deleteAll() {
    await this.userRepository.delete({});
  }
}
