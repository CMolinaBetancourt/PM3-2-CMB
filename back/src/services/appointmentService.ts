import { FindManyOptions } from "typeorm";
import { appointmentRepository } from "../config/data-source";
import { ICreateAppointmentDTO } from "../dtos/IAppointmentDTO";
import { Appointment } from "../entities/Appointment.entity";
import { Status } from "../interfaces/IAppointment";
import { getUsersByIdService } from "./userService";
import { AppointmentRepository } from "../repository/Appointment.Repository";
import { CustomError } from "../utils/CustomeError";

// const appointmentsDB: IAppointment[] = [
//   {
//     id: 1,
//     date: new Date("2025-07-20"),
//     time: "09:30",
//     status: Status.ACTIVE,
//     userId: 1,
//     procedimiento: Procedimiento.LIMPIEZA,
//   },
//   {
//     id: 2,
//     date: new Date("2025-05-10"),
//     time: "14:00",
//     status: Status.ACTIVE,
//     userId: 2,
//     procedimiento: Procedimiento.RADIOGRAFIA,
//   },
//   {
//     id: 3,
//     date: new Date("2025-08-01"),
//     time: "11:00",
//     status: Status.CANCELLED,
//     userId: 3,
//     procedimiento: Procedimiento.CIRUGIA,
//   },
// ];
// let appointmentId = 4;

//  Implementar una función que pueda retornar el arreglo completo de turnos.
export const getAllAppointmentsService = async (
  userId: number | null = null
): Promise<Appointment[]> => {
  const options: FindManyOptions<Appointment> = {};
  if (userId) {
    options.where = {
      user: {
        id: userId,
      },
    };
  }
  const appointments: Appointment[] = await appointmentRepository.find(options);

  if (!appointments.length) {
    throw new Error(`No existen citas`);
  }
  return appointments;
};

// Implementar una función que pueda obtener el detalle de un turno por ID.
export const getAppointmentByIdService = async (
  id: number
): Promise<Appointment> => {
  const appointmentFound: Appointment | null =
    await appointmentRepository.findOne({
      where: {
        id,
      },
    });
  if (!appointmentFound)
    throw new Error(`La cita con id ${id} no fue encontrada`);
  return appointmentFound;
};

// Implementar una función que pueda crear un nuevo turno, siempre guardando, además, el ID del usuario que ha creado dicho turno. NO PUEDE HABER UN TURNO SIN ID DE USUARIO.
export const createAppointmentService = async (
  appointmentDTO: ICreateAppointmentDTO
): Promise<Appointment> => {
  const userFound = await getUsersByIdService(appointmentDTO.userId);

  AppointmentRepository.validateAllowAppointment(
    appointmentDTO.date,
    appointmentDTO.time
  );
  await AppointmentRepository.validateExistingAppointment(
    appointmentDTO.userId,
    appointmentDTO.date,
    appointmentDTO.time
  );

  const newAppointment: Appointment = appointmentRepository.create({
    date: appointmentDTO.date,
    time: appointmentDTO.time,
    status: Status.ACTIVE,
    user: userFound,
  });
  const results = await AppointmentRepository.save(newAppointment);
  return results;
};

// Implementar una función que reciba el id de un turno específico y una vez identificado el turno correspondiente, cambiar su estado a “cancelled”.
export const cancelAppointmentService = async (id: number): Promise<void> => {
  const appointmentFound = await AppointmentRepository.findOne({
    where: {
      id,
    },
  });

  if (!appointmentFound)
    throw new CustomError(400, `La cita con id: ${id} no existe`);
  AppointmentRepository.validateAllowCancellation(appointmentFound.date);
  appointmentFound.status = Status.CANCELLED;
  await appointmentRepository.save(appointmentFound);
};
