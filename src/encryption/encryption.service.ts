import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
	async makeSault() {
		const saltOrRounds = await bcrypt.genSalt();;
		const password = 'random_password';
		const hash = await bcrypt.hash(password, saltOrRounds);
		return hash
	}
}
