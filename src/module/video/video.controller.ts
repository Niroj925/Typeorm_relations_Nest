import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
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

  @Post()
  async create(@Body() createVideoDto: CreateVideoDto): Promise<Video> {
    return this.videoService.create(createVideoDto);
  }

  // Additional routes as needed
}
