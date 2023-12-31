import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { Channel } from '../channel/entities/channel.entity';
import { Tag } from '../tag/entities/tag.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,

    @InjectRepository(Channel)
    private readonly channelRepository:Repository<Channel>,

    @InjectRepository(Tag)
    private readonly tagRepository:Repository<Tag>
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

  async createVideoWithTags(createVideoDto: CreateVideoDto): Promise<Video> {
    const { title, channelId, tagId } = createVideoDto;

    // Fetch the channel by channelId
    const channel = await this.channelRepository.findOne({where:{id:channelId}});
    if (!channel) {
      // Handle the case where the channel is not found
      throw new NotFoundException('Channel not found');
    }

    // Fetch tags by tagId
    const tags = await this.tagRepository.find({where:{id:tagId}});
    if (!tags) {
      // Handle the case where not all tags are found
      throw new NotFoundException('One or more tags not found');
    }

    // Create a new video
    const video = this.videoRepository.create({ title, channel, tags });

    // Save the video (and the associated channel and tags)
    return this.videoRepository.save(video);
  }

async createVideoWithtag(createVideoDto: CreateVideoDto): Promise<Video> {
  const { title, tagId } = createVideoDto;

  const tag = await this.tagRepository.findOne({where:{id:tagId}});

  if (!tag) {
    throw new NotFoundException('tag not found');
  }

  const video = this. videoRepository.create({ title, tags: [tag] });

  return this.videoRepository.save(video);
}

async getVideos(): Promise<Video[]> {
  return this.videoRepository.find({ relations: ['tags'] });
}

async getVideosByTagId(tagId: number): Promise<Video[]> {
  return this.videoRepository
    .createQueryBuilder('video')
    .innerJoinAndSelect('video.tags', 'tag', 'tag.id = :tagId', { tagId })
    .getMany();
}

  // Additional methods as needed
}
