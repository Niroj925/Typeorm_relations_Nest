import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Tag> {
    const tagId = +id;
    return this.tagService.findById(tagId);
  }

  @Post()
  async create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagService.create(createTagDto);
  }

  // Additional routes as needed
}
