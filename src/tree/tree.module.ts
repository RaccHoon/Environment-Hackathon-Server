import { Module } from '@nestjs/common';
import { TreeService } from './tree.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreeController } from './tree.controller';
import { Tree } from '../entities/trees.entity';
import { BreedingInfo } from '../entities/breedingInfo.entity';
import { UserService } from '../user/user.service'
import { User } from 'src/entities/user.entity';
import { EncryptionService } from '../encryption/encryption.service'

@Module({
  imports: [TypeOrmModule.forFeature([Tree, BreedingInfo, User])],
  providers: [TreeService, UserService, EncryptionService],
  controllers: [TreeController],
  exports: [TreeService]
})
export class TreeModule {}
