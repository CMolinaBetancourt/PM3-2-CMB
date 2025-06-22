import { useState } from "react";
import styles from "./MyAppointments.module.css";
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import MyAppointmentsData from "../../helpers/MyappointmentsData"

function MyAppointments() {
  const [appointments, setAppointments] = useState(MyAppointmentsData);

  return (
    <div className={styles.appointmentContainer}>
      <h2 >Mis citas</h2>
      <div className={styles.appointmentlist}>
        {appointments.map((appoint) => (
          <AppointmentCard key={appoint.id} appointment={appoint} />
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
