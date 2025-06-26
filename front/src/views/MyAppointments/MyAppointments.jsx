import { useEffect, useState } from "react";
import styles from "./MyAppointments.module.css";
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import axios from "axios";


function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/appointments");
      setAppointments(response.data.data);
    } catch (error) {
      console.error(error.response.data);
      setError(
        "Ocurrio un error al solicitar sus citas. Por favor intentelo más tarde"
      );
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className={styles.appointmentContainer}>
      <div className={styles.contentWrapper}></div>
      <h2>Mis citas</h2>
      <div className={styles.appointmentlist}>
        {loading ? (
          <span className={styles.loader}></span>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          appointments.map((appoint) => (
            <AppointmentCard key={appoint.id} appointment={appoint} />
          ))
        )}
      </div>
    </div>
  );
}

export default MyAppointments;
