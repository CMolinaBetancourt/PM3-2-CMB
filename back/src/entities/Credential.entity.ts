import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";

@Entity({name:"credentials"}) 

export class Credential {
    
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({type: "varchar", length: 100, nullable: false, unique: true})
  username: string | undefined;

  @Column({type: "varchar", length: 100, nullable: false})
  password: string | undefined;

  @OneToOne(() => User)
  user: User;

  @CreateDateColumn()
  createAt?: Date
  
  @UpdateDateColumn()
  updateAt?: Date

}