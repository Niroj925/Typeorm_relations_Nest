import { Channel } from "src/module/channel/entities/channel.entity";
import { Tag } from "src/module/tag/entities/tag.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('video')
export class Video {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @ManyToOne(()=>Channel,(channel)=>channel.videos)
    channel:Channel;

    @ManyToMany(()=>Tag)
    @JoinTable({
        name:'video_tag',
        joinColumn:{
         name:'video',
         referencedColumnName:'id'
        },
        inverseJoinColumn:{
         name:'tag',
         referencedColumnName:'id'
        }
       })
    tags:Tag[];
}
