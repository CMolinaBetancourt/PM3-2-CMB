import {
  Entity,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.entity";

export enum Status {
  ACTIVE = "activa",
  CANCELLED = "cancelada",
}

export enum Procedimiento {
  LIMPIEZA = "limpieza",
  CIRUGIA = "cirugía",
  RADIOGRAFIA = "radiografía",
}

@Entity({ name: "appointments" })
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date", nullable: false })
  date: Date;

  @Column({ type: "time", nullable: false })
  time: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @Column({
    type: "enum",
    enum: Procedimiento,
    nullable: false,
  })
  procedimiento: Procedimiento;

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;
}
