import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
	async makeSault(password: string) {
		const saltOrRounds = await bcrypt.genSalt();
		const hash = await bcrypt.hash(password, saltOrRounds);
		return hash
	}
}
