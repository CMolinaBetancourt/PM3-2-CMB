import { Appointment } from "../entities/Appointment.entity";

export interface IUserResponseDTO {
  id: number;
  pacientFirstName: string;
  pacientFirstLastName: string;
  email: string;
  appointments: Appointment[]
}

export interface IUserRegisterDTO {
  pacientFirstName: string;
  pacientFirstLastName: string;
  birthdate: Date;
  nDni: number;
  parentName: string;
  parentLastName: string;
  email: string;
  username: string;
  password: string;
}

export interface UserLoginDTO {
  username: string;
  password: string;
}