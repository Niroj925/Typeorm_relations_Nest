import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { Channel } from '../channel/entities/channel.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,

    @InjectRepository(Channel)
    private readonly channelRepository:Repository<Channel>
  ) {}

  async findAll(): Promise<Video[]> {
    return this.videoRepository.find({ relations: ['channel'] });
  }

  async findById(id: number): Promise<Video> {
    const user = await this.videoRepository.findOne({
      where: { id },
      relations: ['channel'],
    });
  
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  
    return user;
  }

  // async create(createVideoDto: CreateVideoDto): Promise<Video> {
  //   const video = this.videoRepository.create(createVideoDto);
  //   return this.videoRepository.save(video);
  // }

  async create(channelId: number, createVideoDto: CreateVideoDto): Promise<Video> {
    // Find the user with the given channelId
    const channel = await this.channelRepository.findOne({
      where:{
        id:channelId
      }
    });

    if (!channel) {
      throw new ForbiddenException('channel id not found')
    }

    try{
    // Create a new channel and associate it with the user
    const video = this.videoRepository.create({
      ...createVideoDto,
      channel, // Assign the user to the channel
    });

    // Save the channel to the database
    return this.videoRepository.save(video);
  }catch(error){
 throw new ForbiddenException(error)
}
}
  // Additional methods as needed
}
