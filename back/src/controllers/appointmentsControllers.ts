import { Request, Response } from "express";
import {
  cancelAppointmentService,
  createAppointmentService,
  getAllAppointmentsService,
  getAppointmentByIdService,
} from "../services/appointmentService";
import { Appointment } from "../entities/Appointment.entity";

// GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.
export const getAllAppointmentController = async (_req: Request,res: Response) => {
  try {
    const appointments: Appointment[] = await getAllAppointmentsService();
    res.status(200).json({
      message: "Este es el listado de todas las citas, de todos los pacientes",
      data: appointments,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocurrió un error",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// GET /appointments => Obtener el detalle de un turno específico.
export const getAppointmentByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // tengo que enviarle el id y debe ser tipo number
    const appointment: Appointment = await getAppointmentByIdService(
      Number(id)
    );
    res.status(200).json({
      message: "Esta es la información de la cita específica.",
      data: appointment,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocurrió un error",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// POST /appointments/schedule => Agendar un nuevo turno.
export const scheduleAppointmentController = async (req: Request,res: Response) => {
  try {
    const newAppointment: Appointment = await createAppointmentService(
      req.body
    );
    res.status(200).json({
      message: "La cita fue agendada exitosamente",
      data: newAppointment,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocurrió un error",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// PUT /appointments/cancel => Cambiar el estatus de un turno a “cancelled”.
export const cancelAppointmentController = async (req: Request<{id:string}>, res: Response):Promise<void> => {
  try {
    const id = req.params.id; // tengo que enviarle el id y debe ser tipo number
    await cancelAppointmentService(Number(id));
    res.status(200).json({
      message: "La cita ha sido cancelada.",
      
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocurrió un error",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
