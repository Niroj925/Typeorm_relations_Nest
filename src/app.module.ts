import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { ChannelModule } from './module/channel/channel.module';
import { VideoModule } from './module/video/video.module';
import { TagModule } from './module/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/pg.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot(databaseConfig),
     UserModule,
     ChannelModule,
     VideoModule,
     TagModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
