import { Request, Response } from "express";
import IAppointment from "../interfaces/IAppointment";
import {
  cancelAppointmentService,
  createAppointmentService,
  getAllAppointmentsService,
  getAppointmentByIdService,
} from "../services/appointmentService";

// GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.
export const getAllAppointmentController = async (
  _req: Request,
  res: Response
) => {
  try {
    const appointments: IAppointment[] = await getAllAppointmentsService();
    res.status(200).json({
      message: "Obtener el listado de todas las citas de todos los usuarios",
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
export const getAppointmentByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id; // tengo que enviarle el id y debe ser tipo number
    const appointment: IAppointment = await getAppointmentByIdService(
      Number(id)
    );
    res.status(200).json({
      message: "Obtener el detalle de una cita específica.",
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
export const scheduleAppointmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const newAppointment: IAppointment = await createAppointmentService(
      req.body
    );
    res.status(200).json({
      message: "Agendar una nueva cita",
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
export const cancelAppointmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id; // tengo que enviarle el id y debe ser tipo number
    const appointmentId: number = await cancelAppointmentService(Number(id));
    res.status(200).json({
      message: "Cambiar el estatus de una cita a cancelada.",
      data: appointmentId,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocurrió un error",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
