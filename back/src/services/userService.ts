import { IUserRegisterDTO, IUserResponseDTO } from "../dtos/IUserDTO";
import IUser from "../interfaces/IUser";
import Iuser from "../interfaces/IUser";
import { createCredentialService } from "./credentialService";

const usersDB: Iuser[] = [
  {
    id: 1,
    firstName: "Juan",
    firstLastName: "Pérez",
    secondLastName: "García",
    birthdate: new Date("1990-01-01"),
    nDni: 123456789,
    parentName: "Pedro",
    parentLastName: "Pérez",
    email: "juan@example.com",
    credentialsId: 1,
  },

  {
    id: 2,
    firstName: "Ana",
    middleName: "María",
    firstLastName: "Rodríguez",
    birthdate: new Date("1992-05-15"),
    nDni: 987654321,
    parentName: "Laura",
    parentLastName: "Rodríguez",
    email: "ana@example.com",
    credentialsId: 2,
  },
];
let userId = 3;

//Implementar una función que pueda retornar el arreglo completo de usuarios.
//No quiero retornar toda la información del usersDB, creo un DTO y con el map transformo los objetos,extraigo la info y la llevo a un nuevo array
export const getAllUsersService = async (): Promise<IUserResponseDTO[]> => {
  const newArray = usersDB.map((user) => {
    const objetoUser = {
      id: user.id,
      firstName: user.firstName,
      firstLastName: user.firstLastName,
      email: user.email,
    };
    return objetoUser;
  });
  return newArray;
};

// Implementar una función que pueda retornar un elemento del arreglo que haya sido identificado por id.
export const getUsersByIdService = async (id: number): Promise<IUserResponseDTO | undefined> => {
  const userFound = usersDB.find((user) => user.id === id);
  if (!userFound) throw new Error(`El usuario con id ${id} no fue encontrado`);
  return {
    id: userFound.id,
    firstName: userFound.firstName,
    firstLastName: userFound.firstLastName,
    email: userFound.email,
  };
};

// Implementar una función que pueda crear un nuevo usuario dentro del arreglo PERO ten en cuenta que al momento de crear el usuario, debe crear su correspondiente par de credenciales llamando a la función correspondiente del servicio de credenciales. Al recibir de esta función el id de las credenciales, debe guardar el dato en la propiedad credentialsId.
export const createUserService = async (
  userData: IUserRegisterDTO
): Promise<IUserResponseDTO> => {
  const CredentialId = await createCredentialService(
    userData.username,
    userData.password
  );
  const newUser: IUser = {
    id: userId++,
    firstName: userData.firstName,
    middleName: userData.middleName,
    firstLastName: userData.firstLastName,
    secondLastName: userData.secondLastName,
    birthdate: userData.birthdate,
    nDni: userData.nDni,
    parentName: userData.parentName,
    parentLastName: userData.parentLastName,
    email: userData.email,
    credentialsId: CredentialId,
  };
  usersDB.push(newUser);
  return newUser;
};
