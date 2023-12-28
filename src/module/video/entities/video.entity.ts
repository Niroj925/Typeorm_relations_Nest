import { Channel } from "src/module/channel/entities/channel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('video')
export class Video {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @ManyToOne(()=>Channel,(channel)=>channel.videos)
    channel:Channel;
}
