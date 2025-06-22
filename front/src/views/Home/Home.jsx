import style from "./Home.module.css";
import homeImage from "../../assets/homeImage.png";

function Home() {
  return (
    <div>
      <div className={style.homeContainer}>
        <div className={style.homeTextContainer}>
          <h1>¡La sonrisa saludable de tus hijos es nuestro tesoro!</h1>
          <p>
            En Doctor Muelitas, sabemos que cada pequeño merece una experiencia
            dental feliz y libre de miedos. Por eso, hemos creado un espacio
            donde el cuidado oral se convierte en una aventura positiva y
            divertida desde el primer día.
            <br />
            Establecer una rutina de visitas al dentista desde la infancia es la
            clave para sembrar las bases de una sonrisa sana y fuerte para toda
            la vida. Recomendamos que la primera visita de tu hijo sea entre su
            primer y segundo año de vida. Este enfoque temprano nos permite
            detectar y atender cualquier detalle a tiempo, mientras
            acostumbramos a los niños a nuestro amigable equipo y a un entorno
            dental lúdico.
            <br />
            ¡Así, las futuras visitas serán algo esperado y positivo,
            construyendo una relación de confianza que durará para siempre!.
          </p>
        </div>
        <img src={homeImage} alt="imageChildren" />
      </div>
    </div>
  );
}

export default Home;
