const scheduleValidate = (values) => {
  const errors = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!values.date) {
    errors.date = "La fecha es requerida";
  } else {
    const selectedDate = new Date(values.date + 'T00:00:00'); 
    
    if (selectedDate < today) {
      errors.date = "No puedes seleccionar una fecha pasada";
    }

    const dayOfWeek = selectedDate.getDay(); 
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      errors.date = "No se permiten citas los fines de semana";
    }
  }

  if (!values.time) {
    errors.time = "La hora es requerida";
  } else {
    const hour = parseInt(values.time.split(":")[0]);
    if (hour < 9 || hour > 17) {
      errors.time = "La hora debe estar entre las 08:00 y las 17:00";
    }
  }

  return errors;
};

export default scheduleValidate;