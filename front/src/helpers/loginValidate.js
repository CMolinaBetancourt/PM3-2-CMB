const loginValidate = (input) => {
  const errors = {};

  if (!input.username.trim()) {
    errors.username = "El usuario es requerido.";
  }

  if (!input.password) {
    errors.password = "La contraseña es requerida.";
  // } else {
  //   if (input.password.length < 8) {
  //     errors.password = "La contraseña debe tener al menos 8 caracteres.";
  //   }
  //   if (!/[A-Z]/.test(input.password)) {
  //     errors.password = "La contraseña debe contener al menos una letra mayúscula.";
  //   }
  //   if (!/\d/.test(input.password)) {
  //     errors.password = "La contraseña debe contener al menos un número.";
  //   }
  //   const specialCharRegex = new RegExp('[!@#$%^&*()_+\\-=\\[\\]{};:\'"\\|,.<>\\/?]');

  //   if (!specialCharRegex.test(input.password)) {
  //     errors.password = "La contraseña debe contener al menos un carácter especial (ej. !@#$%).";
  //   }
  }

  return errors;
};

export default loginValidate;