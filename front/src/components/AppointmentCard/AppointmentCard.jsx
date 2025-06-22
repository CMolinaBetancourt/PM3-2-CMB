import styles from "./AppointmentCard.module.css"


function AppointmentCard ({appointment}){
    const {id, date, time, status} = appointment
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
          status === "cancelled" ? styles.disabled : ""
        }`}
        //onClick={handleCancel}
        disabled={status === "cancelled"}
      >
        Cancelar cita
      </button>
    </div>
  );
}

export default AppointmentCard