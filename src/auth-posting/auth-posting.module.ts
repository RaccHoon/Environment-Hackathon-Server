import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthPosting } from '../entities/authPosting.entity'
import { AuthPostingController } from './auth-posting.controller'
import { AuthPostingService } from './auth-posting.service'

@Module({
	imports: [TypeOrmModule.forFeature([AuthPosting])],
    controllers: [AuthPostingController],
    providers: [AuthPostingService],
    exports: [AuthPostingService]
})
export class AuthPostingModule {}
