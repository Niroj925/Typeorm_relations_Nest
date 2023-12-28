import { Channel } from "src/module/channel/entities/channel.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tag')
export class Tag {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @ManyToOne(()=>Channel,(channel)=>channel.videos)
    channel:Channel;

    @ManyToMany(()=>Tag)
    @JoinTable()
    tags:Tag[];
}
