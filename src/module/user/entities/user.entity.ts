// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Channel } from 'src/module/channel/entities/channel.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({unique:true})
  email:string;

  @OneToMany(() => Channel, channel=> channel.user)
  channel: Channel;
}
