import {Status, Procedimiento} from "../interfaces/IAppointment"


export interface ICreateAppointmentDTO{
  id: number;
  date: Date;
  time: string;
  status: Status;
  userId: number;
  procedimiento: Procedimiento;
}