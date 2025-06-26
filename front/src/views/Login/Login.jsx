import styles from "./Login.module.css";
import loginValidate from "../../helpers/loginValidate";
import axios from "axios";
import Swal from "sweetalert2";
import { useFormik } from "formik";
//import { Link} from "react-router-dom";

function Login() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    initialErrors: {
      username: "El usuario es requerido ",
      password: "La contraseña es requerida",
    },
    validate: loginValidate,
    onSubmit: (values, { resetForm }) => {
      axios
        .post("http://localhost:3000/users/login", values)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "¡Genial! 🎉",
              text: "¡Bienvenido! Has iniciado sesión correctamente ✨",
            });
            resetForm();
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.status === 400) {
            Swal.fire({
              icon: "error",
              title: `${err.response.data.error}`,
              text: "No te preocupes, ¡inténtalo de nuevo! 💪",
            });
          }
        });
    },
  });

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h2>Formulario De Login</h2>
        </div>

        <form onSubmit={formik.handleSubmit}>
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
            {formik.errors.username && (
              <span className={styles.error}>{formik.errors.username}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password:</label>
            <input
              className={styles.formInput}
              type="password"
              name="password"
              placeholder="●●●●●●"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <span className={styles.error}>{formik.errors.password}</span>
            )}
          </div>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={
              Object.keys(formik.errors).length > 0 ||
              !formik.values.username ||
              !formik.values.password
            }
          >
            Submit
          </button>
        </form>

        <br />
        {/* <label>
       Si aún no tienes una cuenta, <Link to="/register">Regístrate!</Link>
        </label> */}
      </div>
    </div>
  );
}

export default Login;
