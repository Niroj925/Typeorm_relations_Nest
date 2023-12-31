import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { Video } from '../video/entities/video.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,

    @InjectRepository(Video)
    private readonly videoRepository:Repository<Video>
  ) {}

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find({ relations: ['channel', 'tags'] });
  }

  async findById(id: number): Promise<Tag> {
    const video = await this.tagRepository.findOne({
      where: { id },
      relations: ['channel', 'tags'],
    });
  
    if (!video) {
      throw new NotFoundException(`video with ID ${id} not found`);
    }
  
    return video;
  }

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = this.tagRepository.create(createTagDto);
    return this.tagRepository.save(tag);
  }

  // Additional methods as needed
}
