import styles from './Navbar.module.css'; 

function Navbar() {
  return (
    <header className={styles.navbarcontainer}>
      <h2 >NavBar</h2>
      <nav>
        <ul className={styles.navbarlinks}>
            <li><a href="#"></a>Home</li>
            <li><a href="#"></a>Registro</li>
            <li><a href="#"></a>Citas</li>
            <li><a href="#"></a>Login</li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar;
