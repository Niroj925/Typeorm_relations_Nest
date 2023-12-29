import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { Channel } from './entities/channel.entity';
import { CreateChannelDto } from './dto/create-channel.dto';

@Controller('channels')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  findAll(): Promise<Channel[]> {
    return this.channelService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Channel> {
    const channelId = +id;
    return this.channelService.findById(channelId);
  }

  // @Post()
  // async create(@Body() createChannelDto: CreateChannelDto): Promise<Channel> {
  //   return this.channelService.create(createChannelDto);
  // }

  @Post(':userId') // Expecting userId as a route parameter
  async create(@Param('userId') userId: number, @Body() createChannelDto: CreateChannelDto): Promise<Channel> {
    return this.channelService.create(userId, createChannelDto);
  }

  // Additional routes as needed
}
