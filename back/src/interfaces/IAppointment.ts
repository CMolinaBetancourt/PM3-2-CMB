interface IAppointment {
  id: number;
  date: Date;
  time: string;
  status: Status;
  userId: number;
}

// Para llamar el enum funciona como un objeto Status.active o Status.cancelled
export enum Status {
  ACTIVE = "activa",
  CANCELLED = "cancelada",
}

// Se puede plantear así en lugar del enum
//type AppointmentStatus =  "active" | "cancelled"

export default IAppointment;
