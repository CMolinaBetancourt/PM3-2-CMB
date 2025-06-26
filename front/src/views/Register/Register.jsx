import React, { useState } from "react";
import { useFormik } from "formik";
import styles from "./Register.module.css";
import registerValidate from "../../helpers/registerValidate";
import axios from "axios";
import Swal from "sweetalert2";
//import { Link } from "react-router-dom";
import Logoheader from "../../assets/logoDrMuelitas.png";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      pacientFirstName: "",
      pacientMiddleName: "",
      pacientFirstLastName: "",
      pacientSecondLastName: "",
      birthdate: "",
      nDni: "",
      parentName: "",
      parentLastName: "",
      email: "",
      username: "",
      password: "",
    },

    initialErrors: {
      pacientFirstName: "El primer nombre del paciente es requerido",
      pacientFirstLastName: "El primer apellido del paciente es requerido",
      birthdate: "La fecha de nacimiento del paciente es requerida",
      nDni: "El número de identificación del paciente es requerido",
      parentName: "El nombre del padre/madre del paciente es requerido",
      parentLastName: "El apellido del padre/madre del paciente es requerido",
      email: "El email es requerido",
      username: "El usuario es requerido",
      password: "La contraseña es requerida",
    },
    validate: registerValidate,
    onSubmit: (values, { resetForm }) => {
      axios
        .post("http://localhost:3000/users/register", values)
        .then((res) => {
          if (res.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Usuario registrado con éxito",
            });
            resetForm();
          }
        })
        .catch((err) => {
          if (err.response.data.error.includes("email")) {
            Swal.fire({
              icon: "error",
              title: `Ya existe un usuario con el mail: ${values.email}`,
            });
          } else if (err.response.data.error.includes("username")) {
            Swal.fire({
              icon: "error",
              title: `Ya existe un usuario con el username: ${values.username}`,
            });
          } else if (err.response.data.error.includes("nDni")) {
            Swal.fire({
              icon: "error",
              title: `Ya existe un usuario con el nDNI: ${values.nDni}`,
            });
          }
        });
    },
  });
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={styles.registerContainer}>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <h2 className={styles.formTitle}>Formulario De Registro</h2>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Primer nombre del paciente:
          </label>
          <input
            className={styles.formInput}
            type="text"
            name="pacientFirstName"
            placeholder="Primer nombre del paciente"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pacientFirstName}
          />
          {formik.errors.pacientFirstName && formik.errors.pacientFirstName ? (
            <label className={styles.errorLabel}>
              {formik.errors.pacientFirstName}
            </label>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Segundo nombre del paciente:
          </label>
          <input
            className={styles.formInput}
            type="text"
            name="pacientMiddleName"
            placeholder="Segundo nombre del paciente"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pacientMiddleName}
          />
          {formik.errors.pacientMiddleName &&
          formik.errors.pacientMiddleName ? (
            <label className={styles.errorLabel}>
              {formik.errors.pacientMiddleName}
            </label>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Primer apellido del paciente:
          </label>
          <input
            className={styles.formInput}
            type="text"
            name="pacientFirstLastName"
            placeholder="Primer apellido del paciente"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pacientFirstLastName}
          />
          {formik.errors.pacientFirstLastName &&
          formik.errors.pacientFirstLastName ? (
            <label className={styles.errorLabel}>
              {formik.errors.pacientFirstLastName}
            </label>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Segundo apellido del paciente:
          </label>
          <input
            className={styles.formInput}
            type="text"
            name="pacientSecondLastName"
            placeholder="Segundo apellido del paciente"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pacientSecondLastName}
          />
          {formik.errors.pacientSecondLastName &&
          formik.errors.pacientSecondLastName ? (
            <label className={styles.errorLabel}>
              {formik.errors.pacientSecondLastName}
            </label>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Fecha de nacimiento del paciente:
          </label>
          <input
            className={styles.formInput}
            type="date"
            name="birthdate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.birthdate}
            max={today} // Restrict future dates
          />
          {formik.errors.birthdate && formik.errors.birthdate ? (
            <label className={styles.errorLabel}>
              {formik.errors.birthdate}
            </label>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>nDni del paciente:</label>
          <input
            className={styles.formInput}
            type="text"
            name="nDni"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nDni}
          />
          {formik.errors.nDni && formik.errors.nDni ? (
            <label className={styles.errorLabel}>{formik.errors.nDni}</label>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Primer nombre del padre /madre del paciente:
          </label>
          <input
            className={styles.formInput}
            type="text"
            name="parentName"
            placeholder="Primer nombre del padre /madre del paciente"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.parentName}
          />
          {formik.errors.parentName && formik.errors.parentName ? (
            <label className={styles.errorLabel}>
              {formik.errors.parentName}
            </label>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Primer apellido del padre /madre del paciente:
          </label>
          <input
            className={styles.formInput}
            type="text"
            name="parentLastName"
            placeholder="Primer apellido del padre /madre del paciente:"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.parentLastName}
          />
          {formik.errors.parentLastName && formik.errors.parentLastName ? (
            <label className={styles.errorLabel}>
              {formik.errors.parentLastName}
            </label>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Email:</label>
          <input
            className={styles.formInput}
            type="text"
            name="email"
            placeholder="mail@mail.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.errors.email ? (
            <label className={styles.errorLabel}>{formik.errors.email}</label>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Username:</label>
          <input
            className={styles.formInput}
            type="text"
            name="username"
            placeholder="Tu nombre de usuario"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.errors.username && formik.errors.username ? (
            <label className={styles.errorLabel}>
              {formik.errors.username}
            </label>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Password:</label>
          <div className={styles.passwordInputContainer}>
            {" "}
            {/* Container for input and toggle */}
            <input
              className={styles.formInput}
              type={showPassword ? "text" : "password"} // Toggle input type
              name="password"
              placeholder="••••••"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <button
              type="button" // Important: type="button" to prevent form submission
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"} {/* Eye icon toggle */}
            </button>
          </div>
          
          {formik.errors.password && formik.errors.password ? (
            <label className={styles.errorLabel}>
              {formik.errors.password}
            </label>
          ) : null}
        </div>

        <button
          className={styles.formButton}
          type="submit"
          disabled={
            Object.keys(formik.errors).length > 0 ||
            !formik.values.pacientFirstName ||
            !formik.values.pacientFirstLastName ||
            !formik.values.birthdate ||
            !formik.values.nDni ||
            !formik.values.email ||
            !formik.values.parentName ||
            !formik.values.parentLastName ||
            !formik.values.username ||
            !formik.values.password
          }
        >
          Submit
        </button>
        <br />
        {/* <label className={styles.labelink}>
        Ya tienes una cuenta? <Link to="/login">Inicia sesión!</Link>
      </label> */}
      </form>
    </div>
  );
}

export default Register;
