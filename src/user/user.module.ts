import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EncryptionService } from '../encryption/encryption.service'

@Module({
	imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, EncryptionService],
    exports: [UserService, EncryptionService]
})
export class UserModule {}
