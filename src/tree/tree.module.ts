import { Module } from '@nestjs/common';
import { TreeService } from './tree.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreeController } from './tree.controller';
import { Tree } from '../entities/trees.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tree])],
  providers: [TreeService],
  controllers: [TreeController],
  exports: [TreeService]
})
export class TreeModule {}
