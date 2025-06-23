"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentController = exports.scheduleAppointmentController = exports.getAppointmentByIdController = exports.getAllAppointmentController = void 0;
const appointmentService_1 = require("../services/appointmentService");
// GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.
const getAllAppointmentController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointmentService_1.getAllAppointmentsService)();
        res.status(200).json({
            message: "Este es el listado de todas las citas, de todos los pacientes",
            data: appointments,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Ocurrió un error",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
});
exports.getAllAppointmentController = getAllAppointmentController;
// GET /appointments => Obtener el detalle de un turno específico.
const getAppointmentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; // tengo que enviarle el id y debe ser tipo number
        const appointment = yield (0, appointmentService_1.getAppointmentByIdService)(Number(id));
        res.status(200).json({
            message: "Esta es la información de la cita específica.",
            data: appointment,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Ocurrió un error",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
});
exports.getAppointmentByIdController = getAppointmentByIdController;
// POST /appointments/schedule => Agendar un nuevo turno.
const scheduleAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAppointment = yield (0, appointmentService_1.createAppointmentService)(req.body);
        res.status(200).json({
            message: "La cita fue agendada exitosamente",
            data: newAppointment,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Ocurrió un error",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
});
exports.scheduleAppointmentController = scheduleAppointmentController;
// PUT /appointments/cancel => Cambiar el estatus de un turno a “cancelled”.
const cancelAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; // tengo que enviarle el id y debe ser tipo number
        yield (0, appointmentService_1.cancelAppointmentService)(Number(id));
        res.status(200).json({
            message: "La cita ha sido cancelada.",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Ocurrió un error",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
});
exports.cancelAppointmentController = cancelAppointmentController;
