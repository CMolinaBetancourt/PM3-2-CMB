import moment from 'moment';

const registerValidate = (input) => {
  const errors = {};

if (!input.pacientFirstName.trim()) {
    errors.pacientFirstName = 'El primer nombre del paciente es obligatorio';
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(input.pacientFirstName)) {
  errors.pacientFirstName= "El primer nombre del paciente debe ser válido, debe contener sólo letras";
}

if (!input.pacientFirstLastName.trim()) {
    errors.pacientFirstLastName = 'El primer apellido del paciente es obligatorio';
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(input.pacientFirstLastName)) {
  errors.pacientFirstLastName = "El primer apellido del paciente debe ser válido, debe contener sólo letras";
}

if (!input.birthdate) {
    errors.birthdate = 'La fecha de nacimiento del paciente es obligatoria';
  } else {
    const birthdateMoment = moment(input.birthdate);
     // Validar si la fecha es una fecha válida
    if (!birthdateMoment.isValid()) {
      errors.birthdate = 'La fecha de nacimiento no es válida';
    } 
  }

 if (!input.nDni) {
    errors.nDni = 'El número de documento de identidad del paciente es obligatorio';
  } else if (!/^\d+$/.test(input.nDni)) {
    errors.nDni = 'El DNI debe contener solo números';
  } else if (input.nDni.length < 8 || input.nDni.length > 9 ) {
     errors.nDni = 'El nDni debe tener entre 8 y 9 dígitos';
  }




  if (!input.parentName.trim()) {
    errors.parentName = 'El nombre del padre/madre del paciente es obligatorio';
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(input.parentName)) {
  errors.parentName = "El nombre del padre/madre del paciente debe ser válido, debe contener sólo letras";
}

 if (!input.parentLastName.trim()) {
    errors.parentLastName = 'El apellido del padre/madre del paciente es obligatorio';
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(input.parentLastName)) {
  errors.parentLastName = "El apellido del padre/madre del paciente debe ser válido, debe contener sólo letras";
}


// if (!input.parentbirthdate) {
//     errors.parentbirthdate = 'La fecha de nacimiento del padre/madre es obligatoria';
//   } else {
//     const birthdateMoment = moment(input.parentbirthdate);
//     const todayMoment = moment();

//     // Validar si la fecha es una fecha válida
//     if (!birthdateMoment.isValid()) {
//       errors.parentbirthdate = 'La fecha de nacimiento no es válida';
//     } else {
//       // Calcular la edad
//       const age = todayMoment.diff(birthdateMoment, 'years');

//       if (age < 18) {
//         errors.parentbirthdate= "El usuario debe tener al menos 18 años";
//       }
//     }
//   }

  if (!input.email.trim()) {
    errors.email = 'El email es obligatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.email = 'Formato de email inválido';
  }

 
  if (!input.username.trim()) {
    errors.username = 'El nombre de usuario es obligatorio';
  } else if (input.username.trim().length < 5) {
    errors.username = 'El nombre de usuario debe tener al menos 5 caracteres';
  } else if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
  errors.username = "El nombre de usuario debe contener sólo letras y números";
}
const specialCharRegex = new RegExp('[!@#$%^&*()_+\\-=\\[\\]{};:\'"\\|,.<>\\/?]');
  if (!input.password) {
    errors.password = 'La contraseña es obligatoria';
  } else if (input.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres';
  } else if (!/[A-Z]/.test(input.password)) {
    errors.password = 'La contraseña debe contener al menos una mayúscula';
  } else if (!/\d/.test(input.password)) {
    errors.password = 'La contraseña debe contener al menos un número';
  } else if (!specialCharRegex.test(input.password)) {
      errors.password = "La contraseña debe contener al menos un carácter especial (ej. !@#$%).";
    }

  return errors
};

export default registerValidate;

