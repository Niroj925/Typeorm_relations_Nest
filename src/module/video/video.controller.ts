import { Controller, Get, Post, Body, Param, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  findAll(): Promise<Video[]> {
    return this.videoService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Video> {
    const videoId = +id;
    return this.videoService.findById(videoId);
  }

  // @Post('add')
  // async createVideoWIthTagId(@Body() createVideoDto: CreateVideoDto): Promise<Video> {
  //   return this.videoService.createVideoWithtag(createVideoDto);
  // }

  @Post('add')
  async createVideoWithTags(@Body() createVideoDto: CreateVideoDto): Promise<Video> {
    return this.videoService.createVideoWithTags(createVideoDto);
  }

  @Get('tag/:tagId')
  async getVideoByTagId(@Param('tagId') tagId: number): Promise<Video[]> {
    return this.videoService.getVideosByTagId(tagId);
  }




  // Additional routes as needed
}
