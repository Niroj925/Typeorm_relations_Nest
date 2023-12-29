import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from './entities/channel.entity';
import { CreateChannelDto } from './dto/create-channel.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,

    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
  ) {}

  async findAll(): Promise<Channel[]> {
    return this.channelRepository.find({ relations: ['user', 'videos'] });
  }

  async findById(id: number): Promise<Channel> {
    const user = await this.channelRepository.findOne({
      where: { id },
      relations: ['user', 'videos'],
    });
  
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  
    return user;
  }

  // async create(createChannelDto: CreateChannelDto): Promise<Channel> {
  //   const channel = this.channelRepository.create(createChannelDto);
  //   return this.channelRepository.save(channel);
  // }
  async create(userId: number, createChannelDto: CreateChannelDto): Promise<Channel> {
    // Find the user with the given userId
    const user = await this.userRepository.findOne({
      where:{
        id:userId
      }
    });

    if (!user) {
      // Handle the case where the user with the given ID is not found.
      // You might want to throw an exception or return an appropriate response.
      throw new ForbiddenException('user not found')
    }

    // Create a new channel and associate it with the user
    const channel = this.channelRepository.create({
      ...createChannelDto,
      user, // Assign the user to the channel
    });

    // Save the channel to the database
    return this.channelRepository.save(channel);
  }

  // Additional methods as needed
}
