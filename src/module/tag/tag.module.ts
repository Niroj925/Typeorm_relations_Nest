import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Video } from '../video/entities/video.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Tag,Video])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
