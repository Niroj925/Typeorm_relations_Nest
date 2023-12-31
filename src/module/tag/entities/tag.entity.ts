
import { Video } from "src/module/video/entities/video.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tag')
export class Tag {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @ManyToMany(() => Video, video => video.tags)
    videos: Video[];
}
