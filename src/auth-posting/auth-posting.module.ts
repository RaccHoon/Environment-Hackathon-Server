import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthPosting } from '../entities/authPosting.entity'
import { AuthPostingController } from './auth-posting.controller'
import { AuthPostingService } from './auth-posting.service'
import { UserService } from '../user/user.service'
import { User } from '../entities/user.entity'
import { EncryptionService } from '../encryption/encryption.service'

@Module({
	imports: [TypeOrmModule.forFeature([AuthPosting, User])],
    controllers: [AuthPostingController],
    providers: [AuthPostingService, UserService, EncryptionService],
    exports: [AuthPostingService]
})
export class AuthPostingModule {}
