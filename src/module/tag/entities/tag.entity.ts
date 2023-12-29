
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tag')
export class Tag {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;
}
