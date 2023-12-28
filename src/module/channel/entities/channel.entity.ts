import { User } from "src/module/user/entities/user.entity";
import { Video } from "src/module/video/entities/video.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('channel')
export class Channel {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @OneToOne(()=>User,(user)=>user.channel)
    @JoinColumn()
    user:User;

    @OneToMany(()=>Video,video=>video.channel)
    videos:Video[];

}
