import { ICreateAppointmentDTO } from "../dtos/IAppointmentDTO";
import IAppointment, {
  Procedimiento,
  Status,
} from "../interfaces/IAppointment";
import { getUsersByIdService } from "./userService";

const appointmentsDB: IAppointment[] = [
  {
    id: 1,
    date: new Date("2025-07-20"),
    time: "09:30",
    status: Status.ACTIVE, 
    userId: 1,
    procedimiento: Procedimiento.LIMPIEZA,
  },
  {
    id: 2,
    date: new Date("2025-05-10"),
    time: "14:00",
    status: Status.ACTIVE,
    userId: 2,
    procedimiento: Procedimiento.RADIOGRAFIA,
  },
  {
    id: 3,
    date: new Date("2025-08-01"),
    time: "11:00",
    status: Status.CANCELLED,
    userId: 3,
    procedimiento: Procedimiento.CIRUGIA,
  },
];
let appointmentId = 4;

//  Implementar una función que pueda retornar el arreglo completo de turnos.
export const getAllAppointmentsService = async (): Promise<IAppointment[]> => {
  return appointmentsDB;
};

// Implementar una función que pueda obtener el detalle de un turno por ID.
export const getAppointmentByIdService = async (
  id: number
): Promise<IAppointment> => {
  const appointmentFound = appointmentsDB.find(
    (appointment) => appointment.id === id
  );
  if (!appointmentFound)
    throw new Error(`La cita con id ${id} no fue encontrada`);
  return appointmentFound;
};

// Implementar una función que pueda crear un nuevo turno, siempre guardando, además, el ID del usuario que ha creado dicho turno. NO PUEDE HABER UN TURNO SIN ID DE USUARIO.
export const createAppointmentService = async (appointmentData: ICreateAppointmentDTO): Promise<IAppointment> => {
  const userFound = await getUsersByIdService(appointmentData.userId);

  const appointmentFound = appointmentsDB.find(
    (appointment) =>
      appointment.userId === appointmentData.userId &&
      appointment.time === appointmentData.time &&
      appointment.date.toDateString() === new Date(appointmentData.date).toDateString() &&
      appointment.status === Status.ACTIVE 
  );

  if (appointmentFound) {
    throw new Error(`Ya existe una cita activa para el usuario el ${new Date(appointmentData.date).toDateString()} a las ${appointmentData.time}`);
  }

  // Crear la nueva cita
  const newAppointment: IAppointment = {
    id: appointmentId++,
    date: new Date(appointmentData.date),
    time: appointmentData.time,
    status: Status.ACTIVE,
    userId: userFound?.id || 0,
    procedimiento: appointmentData.procedimiento,
  };

  appointmentsDB.push(newAppointment);
  return newAppointment;
};

// Implementar una función que reciba el id de un turno específico y una vez identificado el turno correspondiente, cambiar su estado a “cancelled”.
export const cancelAppointmentService = async (id: number): Promise<number> => {
  const appointmentFound = await getAppointmentByIdService(id);

  if (appointmentFound.status == Status.CANCELLED)
    throw new Error(`La cita con ID ${id} ya está cancelada.`);
  appointmentFound.status = Status.CANCELLED;

  return appointmentFound.id;
};
