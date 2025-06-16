import Icredential from "../interfaces/ICredential";

const credentialsDB: Icredential[] = [
  { id: 1, username: "usuario1", password: "pass123" },
  { id: 2, username: "usuario2", password: "clave456" },
  { id: 3, username: "usuario3", password: "secreto789" },
];

let identificador: number = 1;

// Implementar una función que recibirá username y password, y deberá chequear si el nombre de usuario existe entre los datos disponibles y, si es así, si el password es correcto. En caso de que la validación sea exitosa, deberá retornar el ID de las credenciales.
export const checkUsernameExist = (username: string): void => {
  const usernameFound: Icredential | undefined = credentialsDB.find((user) => user.username === username); //Es un método de búsqueda que itera sobre credentialsDB. Busca el primer user cuyo username (propiedad del objeto user) coincida con el username que se pasó como argumento a la función checkUserExist.
  if (usernameFound)throw new Error(`El usuario con username ${username} ya existe, por favor intente con otro usuario`);
};

export const checkUserCredential = async (username: string, password: string) => {
  const usernameFound: Icredential | undefined = credentialsDB.find((user) => user.username === username);
  return usernameFound?.password === password ? usernameFound.id : undefined;
};

// Implementar una función que reciba username y password y cree un nuevo par de credenciales con estos datos.
// Debe retornar el ID del par de credenciales creado.
export const createCredentialService = async (
  username: string,
  password: string
): Promise<number> => {
  checkUsernameExist(username);
  const credential: Icredential = {
    id: identificador,
    username: username,
    password: password,
  };
  credentialsDB.push(credential);
  return identificador++;
};
