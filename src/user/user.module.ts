import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EncryptionService } from '../encryption/encryption.service'
import { Tree } from '../entities/trees.entity'
import { TreeService } from '../tree/tree.service'

@Module({
	imports: [TypeOrmModule.forFeature([User, Tree])],
    controllers: [UserController],
    providers: [UserService, EncryptionService, TreeService],
    exports: [UserService, EncryptionService]
})
export class UserModule {}
