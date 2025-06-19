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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRepository = void 0;
const data_source_1 = require("../config/data-source");
const Appointment_entity_1 = require("../entities/Appointment.entity");
const CustomeError_1 = require("../utils/CustomeError");
const moment_1 = __importDefault(require("moment"));
require("moment-timezone");
const COLOMBIA_TIMEZONE = "America/Bogota";
exports.AppointmentRepository = data_source_1.AppDataSource.getRepository(Appointment_entity_1.Appointment).extend({
    validateAllowAppointment: function (date, time) {
        const nowInColombia = (0, moment_1.default)().tz(COLOMBIA_TIMEZONE);
        const dateString = (0, moment_1.default)(date).format("YYYY-MM-DD");
        const appointmentDateTimeString = `${dateString} ${time}`;
        const appointmentMoment = moment_1.default.tz(appointmentDateTimeString, "YYYY-MM-DD HH:mm", COLOMBIA_TIMEZONE);
        if (appointmentMoment.isBefore(nowInColombia)) {
            throw new CustomeError_1.CustomError(400, `No se pueden agendar citas para fechas u horas pasadas`);
        }
        const thresholdForAnticipation = nowInColombia.clone().add(24, "hours");
        if (appointmentMoment.isBefore(thresholdForAnticipation)) {
            throw new CustomeError_1.CustomError(400, `Las citas por este medio deben agendarse con al menos 24 horas de anticipación, de lo contrario por favor comuniquese telefónicamente`);
        }
        const dayOfWeek = appointmentMoment.day();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            throw new CustomeError_1.CustomError(400, `No se pueden agendar citas los fines de semana`);
        }
        const appointmentHour = appointmentMoment.hour();
        if (appointmentHour < 8 || appointmentHour >= 17) {
            throw new CustomeError_1.CustomError(400, `Horario de atención para citas entre 8 a.m. y 5 p.m. Agende su cita en este horario`);
        }
    },
    validateExistingAppointment: function (userId, date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointmentFound = yield this.findOne({
                where: {
                    user: { id: userId,
                    },
                    time: time,
                    date: date,
                },
            });
            if (appointmentFound)
                throw new CustomeError_1.CustomError(400, `La cita con fecha: ${(0, moment_1.default)(date).format("YYYY-MM-DD")} y hora ${time} ya existe para el usuario con id: ${userId}`);
        });
    },
    validateAllowCancellation: function (date) {
        const nowInColombia = (0, moment_1.default)().tz(COLOMBIA_TIMEZONE);
        const appointmentMoment = (0, moment_1.default)(date).tz(COLOMBIA_TIMEZONE).startOf("day");
        const dayBeforeAppointment = appointmentMoment
            .clone()
            .subtract(1, "day")
            .endOf("day");
        if (nowInColombia.isAfter(dayBeforeAppointment)) {
            throw new CustomeError_1.CustomError(400, `La cita solo puede ser cancelada hasta el día anterior, por favor comuniquese telefónicamente`);
        }
    },
});
