import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthPosting } from '../entities/authPosting.entity'
import { AuthPostingController } from './auth-posting.controller'
import { AuthPostingService } from './auth-posting.service'
import { UserService } from '../user/user.service'
import { User } from '../entities/user.entity'
import { EncryptionService } from '../encryption/encryption.service'
import { Tree } from '../entities/trees.entity'
import { TreeService } from '../tree/tree.service'
import { BreedingInfo } from '../entities/breedingInfo.entity'
import { AuthSupportPeople } from '../entities/authSupportPeople.entity'
import { Picture } from '../entities/picture.entity'
import { LoginTime } from '../entities/logInTime.entity'

@Module({
	imports: [TypeOrmModule.forFeature([AuthPosting, User, Tree, BreedingInfo, AuthSupportPeople, Picture, LoginTime])],
    controllers: [AuthPostingController],
    providers: [AuthPostingService, UserService, EncryptionService, TreeService],
    exports: [AuthPostingService]
})
export class AuthPostingModule {}
