import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity'
import { AuthPostingController } from './auth-posting/auth-posting.controller';
import { AuthPostingService } from './auth-posting/auth-posting.service';
import { AuthPostingModule } from './auth-posting/auth-posting.module';
import "reflect-metadata";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(),
    AuthModule,
    TypeOrmModule.forFeature([User]),
    AuthPostingModule
  ],
  controllers: [AppController, AuthPostingController],
  providers: [AppService, AuthPostingService],
})
export class AppModule {}
