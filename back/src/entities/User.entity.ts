import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Credential } from "./Credential.entity";
import { Appointment } from "./Appointment.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  pacientFirstName: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  pacientMiddleName: string | null;

  @Column({ type: "varchar", length: 100, nullable: false })
  pacientFirstLastName: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  pacientSecondLastName: string | null;

  @Column({ type: "date", nullable: false })
  birthdate: Date;

  @Column({ type: "integer", nullable: false, unique: true })
  nDni: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  parentName: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  parentLastName: string;

  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  email: string;

  @OneToOne(() => Credential, { cascade: true }) // el lugar donde se solicita la info es donde se hace la relation
  @JoinColumn() // define la columna de union de ambas infos
  credentials: Credential; // tipo de dato de la entidad credential

  @CreateDateColumn()
  createAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}
