# Proyecto de Página Web Consultorio Odontológico

### 1. Autenticación del usuario.
- **Historia:** "Como usuario, quiero poder registrarme e iniciar sesión en la plataforma para poder reservar un cita, de modo que mi identidad esté verificada".
- **Criterios de aceptación:**
    - El usuario debe poder registrarse proporcionando un correo electrónico y una contraseña.
    - Tener una validación de que mi usuario fue creado con éxito.
    - Debe recibir un correo electrónico confirmando el registro.
    - El sistema debe autenticar usuarios mediante el correo y contraseña.
    - El usuario no podrá reservar una cita sin estar autenticado.
    - El usuario podrá subir su foto de perfil como opcional.
   
### 2.	Reserva de cita.
- **Historia:** "Como usuario autenticado, quiero poder agendar una cita en una fecha y hora específicas dentro del horario de atención.".
- **Criterios de aceptación:**
    - El usuario solo puede seleccionar horarios:
        - Semana: entre 8 a.m.- 12 p.m. y de 2 p.m. a 5 p.m.
        - Sábados: entre 8 a.m.- 3 p.m. 
        - Domingos: No se pueden agendar citas.
    - Si intenta agendar una cita fuera de esos días u horas, se mostrará un mensaje de error.
    - No se puede duplicar un turno.
    - Solo se puede reservar cita con el/la odontopediatra disponible para fecha y hora.
    - Seleccionar el servicio que quiero reservar.

### 3.	Visualización de citas.
- **Historia:** "Como usuario autenticado, quiero ver un listado de mis citas reservados y cancelados, para poder gestionar mis citas".
- **Criterios de aceptación:**
    - El usuario debe poder ver una lista de citas.
    - Cada cita debe mostrar la fecha, hora y la opción de cancelarlo si aún es posible.

### 4.	Cancelación de cita.
- **Historia:** "Como usuario autenticado, quiero poder cancelar mi cita hasta un día antes de la fecha reservada".
- **Criterios de aceptación:**
    - El usuario debe poder cancelar una cita hasta el día anterior a la cita.
    - No podrá cancelar la cita el mismo día de la cita.
    - Al cancelar, la cita se debe mostrar como una cita cancelada.

### 5. Envío de mails
- **Historia:** "Como usuario autenticado, quiero recibir un mail al momento de reservar o cancelar un turno".
- **Criterios:**
- Email con información de la reserva.
- Email con la confirmación al cancelar el turno.
- Enviar al email asociado a la cuenta.

### 6. Subir foto de perfil
- **Historia:** "Como usuario autenticado, quiero poder subir o modificar mi imagen de perfil en la app".
- **Criterios:**
 - Aceptar formatos .jpg y .png.
 - Almacenar y mostrar la imagen de perfil.
 - Permitir modifica o eliminar la foto.