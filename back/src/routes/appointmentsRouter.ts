import { Router } from "express";
import { cancelAppointmentController, getAllAppointmentController, getAppointmentByIdController, scheduleAppointmentController } from "../controllers/appointmentsControllers";

const appointmentsRouter = Router();


// GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.
appointmentsRouter.get("/", getAllAppointmentController)

// GET /appointments => Obtener el detalle de un turno específico.
appointmentsRouter.get("/:id", getAppointmentByIdController)

// POST /appointments/schedule => Agendar un nuevo turno.
appointmentsRouter.post("/schedule", scheduleAppointmentController)

// PUT /appointments/cancel => Cambiar el estatus de un turno a “cancelled”.
appointmentsRouter.put("/cancel/:id", cancelAppointmentController)

export default appointmentsRouter;