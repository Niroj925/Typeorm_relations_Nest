import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Channel } from '../channel/entities/channel.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Video,Channel])],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
