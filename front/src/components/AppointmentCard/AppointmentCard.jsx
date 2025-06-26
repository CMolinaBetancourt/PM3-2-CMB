import styles from "./AppointmentCard.module.css"
import axios from "axios";
import Swal from "sweetalert2";

function AppointmentCard ({appointment}){
    const {id, date, time, status} = appointment
    const handleCancel = () => {
    axios
      .put(`http://localhost:3000/appointments/cancel/${id}`)
      .then(() => {
        Swal.fire({
          icon: "warning",
          color: "red",
          title: "Cita cancelada correctamente",
        });
        
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error al cancelar la cita, intentelo nuevamente",
        });
      });
  };
    return (
    <div className={styles.appointmentCard}>
      <div className={styles.appointmentHeader}>
        <h3>Cita #{id}</h3>
        <span className={status === "activa" ? styles.statusActive : styles.statusInactive}> {status}
        </span>
      </div>
      <div className={styles.appointmentDetails}>
        <p>
          <strong>Fecha:</strong>
          <span>{date}</span>
        </p>
        <p>
          <strong>Hora:</strong>
          <span>{time}</span>
        </p>
      </div>
      <button
        className={`${styles.cancelButton} ${
          status === "cancelada" ? styles.disabled : ""
        }`}
        onClick={handleCancel}
        disabled={status === "cancelada"}
      >
        Cancelar cita
      </button>
    </div>
  );
}

export default AppointmentCard