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
exports.cancelAppointmentService = exports.createAppointmentService = exports.getAppointmentByIdService = exports.getAllAppointmentsService = void 0;
const data_source_1 = require("../config/data-source");
const IAppointment_1 = require("../interfaces/IAppointment");
const userService_1 = require("./userService");
const Appointment_Repository_1 = require("../repository/Appointment.Repository");
const CustomeError_1 = require("../utils/CustomeError");
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
const getAllAppointmentsService = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (userId = null) {
    const options = {};
    if (userId) {
        options.where = {
            user: {
                id: userId,
            },
        };
    }
    const appointments = yield data_source_1.appointmentRepository.find(options);
    return appointments;
});
exports.getAllAppointmentsService = getAllAppointmentsService;
// Implementar una función que pueda obtener el detalle de un turno por ID.
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield data_source_1.appointmentRepository.findOne({
        where: {
            id,
        },
    });
    if (!appointmentFound)
        throw new Error(`La cita con id ${id} no fue encontrada`);
    return appointmentFound;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
// Implementar una función que pueda crear un nuevo turno, siempre guardando, además, el ID del usuario que ha creado dicho turno. NO PUEDE HABER UN TURNO SIN ID DE USUARIO.
const createAppointmentService = (appointmentDTO) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield (0, userService_1.getUsersByIdService)(appointmentDTO.userId);
    Appointment_Repository_1.AppointmentRepository.validateAllowAppointment(appointmentDTO.date, appointmentDTO.time);
    yield Appointment_Repository_1.AppointmentRepository.validateExistingAppointment(appointmentDTO.userId, appointmentDTO.date, appointmentDTO.time);
    const newAppointment = data_source_1.appointmentRepository.create({
        date: appointmentDTO.date,
        time: appointmentDTO.time,
        status: IAppointment_1.Status.ACTIVE,
        user: userFound,
    });
    const results = yield Appointment_Repository_1.AppointmentRepository.save(newAppointment);
    return results;
});
exports.createAppointmentService = createAppointmentService;
// Implementar una función que reciba el id de un turno específico y una vez identificado el turno correspondiente, cambiar su estado a “cancelled”.
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield Appointment_Repository_1.AppointmentRepository.findOne({
        where: {
            id,
        },
    });
    if (!appointmentFound)
        throw new CustomeError_1.CustomError(400, `La cita con id: ${id} no existe`);
    Appointment_Repository_1.AppointmentRepository.validateAllowCancellation(appointmentFound.date);
    appointmentFound.status = IAppointment_1.Status.CANCELLED;
    yield data_source_1.appointmentRepository.save(appointmentFound);
});
exports.cancelAppointmentService = cancelAppointmentService;
