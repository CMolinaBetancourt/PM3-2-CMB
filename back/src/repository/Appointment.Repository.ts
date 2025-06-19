import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment.entity";
import { CustomError } from "../utils/CustomeError";
import moment from 'moment';
import 'moment-timezone'; 

const COLOMBIA_TIMEZONE = "America/Bogota"; 

export const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({
  validateAllowAppointment: function (date: Date, time: string): void {
    const nowInColombia = moment().tz(COLOMBIA_TIMEZONE);

    const dateString = moment(date).format("YYYY-MM-DD");
    const appointmentDateTimeString = `${dateString} ${time}`;
    const appointmentMoment = moment.tz(
      appointmentDateTimeString,
      "YYYY-MM-DD HH:mm",
      COLOMBIA_TIMEZONE
    );

    if (appointmentMoment.isBefore(nowInColombia)) {
      throw new CustomError(400,`No se pueden agendar citas para fechas u horas pasadas`);
    }

    const thresholdForAnticipation = nowInColombia.clone().add(24, "hours");
    if (appointmentMoment.isBefore(thresholdForAnticipation)) {
      throw new CustomError(400,`Las citas por este medio deben agendarse con al menos 24 horas de anticipación, de lo contrario por favor comuniquese telefónicamente`
      );
    }

    const dayOfWeek = appointmentMoment.day();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      throw new CustomError(400,`No se pueden agendar citas los fines de semana`);
    }

    const appointmentHour = appointmentMoment.hour();
    if (appointmentHour < 8 || appointmentHour >= 17) {
      throw new CustomError(400,`Horario de atención para citas entre 8 a.m. y 5 p.m. Agende su cita en este horario`
      );
    }
  },

  validateExistingAppointment: async function (userId: number, date: Date, time: string): Promise<void> {
    const appointmentFound = await this.findOne({
      where: {
        user: {id: userId,
        },
        time: time,
        date: date,
      },
    });

    if (appointmentFound)
      throw new CustomError(400,`La cita con fecha: ${moment(date).format("YYYY-MM-DD")} y hora ${time} ya existe para el usuario con id: ${userId}`
      );
  },

  validateAllowCancellation: function (date: Date): void {
    const nowInColombia = moment().tz(COLOMBIA_TIMEZONE);
    const appointmentMoment = moment(date).tz(COLOMBIA_TIMEZONE).startOf("day");
    const dayBeforeAppointment = appointmentMoment
      .clone()
      .subtract(1, "day")
      .endOf("day");
    
    if (nowInColombia.isAfter(dayBeforeAppointment)) {
      throw new CustomError(
        400,
        `La cita solo puede ser cancelada hasta el día anterior, por favor comuniquese telefónicamente`
      );
    }
  },
});