import styles from './Navbar.module.css'; 
import logoDrMuelitas from "../../assets/LogoDrMuelitas.png"

function Navbar() {
  return (
    <div className={styles.navbarcontainer}>
      <img src= {logoDrMuelitas} alt="logo"  />
      <nav>
        <ul className={styles.navbarlinks}>
            <li><a href="#"></a>Home</li>
            <li><a href="#"></a>Registro</li>
            <li><a href="#"></a>Citas</li>
            <li><a href="#"></a>Login</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;
