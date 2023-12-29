// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Channel } from 'src/module/channel/entities/channel.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({unique:true})
  email:string;

  @OneToOne(() => Channel, channel=> channel.user)
  channel: Channel;

  
}
