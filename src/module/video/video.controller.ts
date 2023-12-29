import { Controller, Get, Post, Body, Param, NotFoundException, ForbiddenException } from '@nestjs/common';
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

  // @Post()
  // async create(@Body() createVideoDto: CreateVideoDto): Promise<Video> {
  //   return this.videoService.create(createVideoDto);
  // }

  @Post(':channelId') // Expecting channelId as a route parameter
  async create(@Param('channelId') channelId: number, @Body() CreateVideoDto: CreateVideoDto): Promise<Video> {
    return this.videoService.create(channelId, CreateVideoDto);
  }


  // Additional routes as needed
}
