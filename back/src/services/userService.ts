import { AppDataSource, userRepository } from "../config/data-source";
import {
  IUserRegisterDTO,
  IUserResponseDTO,
  UserLoginDTO,
} from "../dtos/IUserDTO";
import { Credential } from "../entities/Credential.entity";
import { User } from "../entities/User.entity";
import {
  createCredentialService,
  validateCredential,
} from "./credentialService";

// const usersDB: Iuser[] = [
//   {
//     id: 1,
//     firstName: "Juan",
//     firstLastName: "Pérez",
//     secondLastName: "García",
//     birthdate: new Date("1990-01-01"),
//     nDni: 123456789,
//     parentName: "Pedro",
//     parentLastName: "Pérez",
//     email: "juan@example.com",
//     credentialsId: 1,
//   },

//   {
//     id: 2,
//     firstName: "Ana",
//     middleName: "María",
//     firstLastName: "Rodríguez",
//     birthdate: new Date("1992-05-15"),
//     nDni: 987654321,
//     parentName: "Laura",
//     parentLastName: "Rodríguez",
//     email: "ana@example.com",
//     credentialsId: 2,
//   },
// ];
// let userId = 3;

//Implementar una función que pueda retornar el arreglo completo de usuarios.
//No quiero retornar toda la información del usersDB, creo un DTO y con el map transformo los objetos,extraigo la info y la llevo a un nuevo array
export const getAllUsersService = async (): Promise<IUserResponseDTO[]> => {
  const users: User[] = await userRepository.find();
  return users.map((user) => ({
    id: user.id,
    pacientFirstName: user.pacientFirstName,
    pacientFirstLastName: user.pacientFirstLastName,
    email: user.email,
    appointments: user.appointments,
  }));
};

// Implementar una función que pueda retornar un elemento del arreglo que haya sido identificado por id.
export const getUsersByIdService = async (
  id: number
): Promise<IUserResponseDTO> => {
  const userFound: User | null = await userRepository.findOne({
    where: { id },
    relations: {
      appointments: true,
    },
  });
  if (!userFound) throw new Error(`El usuario con id ${id} no fue encontrado`);
  return {
    id: userFound.id,
    pacientFirstName: userFound.pacientFirstName,
    pacientFirstLastName: userFound.pacientFirstLastName,
    email: userFound.email,
    appointments: userFound.appointments,
  };
};

// Implementar una función que pueda crear un nuevo usuario dentro del arreglo PERO ten en cuenta que al momento de crear el usuario, debe crear su correspondiente par de credenciales llamando a la función correspondiente del servicio de credenciales. Al recibir de esta función el id de las credenciales, debe guardar el dato en la propiedad credentialsId.
export const createUserService = async (
  userDTO: IUserRegisterDTO
): Promise<IUserResponseDTO> => {
  const resultUser: User = await AppDataSource.transaction(
    async (entityManager) => {
      const newCredential: Credential = await createCredentialService(
        entityManager,
        userDTO.username,
        userDTO.password
      );

      const newUser: User = entityManager.create(User, {
        pacientFirstName: userDTO.pacientFirstName,
        pacientFirstLastName: userDTO.pacientFirstLastName,
        birthdate: new Date(userDTO.birthdate),
        nDni: userDTO.nDni,
        parentName: userDTO.parentName,
        parentLastName: userDTO.parentLastName,
        email: userDTO.email,
        credentials: newCredential,
      });

      const results = await entityManager.save(User, newUser);
      return results;
    }
  );

  return {
    id: resultUser.id,
    pacientFirstName: resultUser.pacientFirstName,
    pacientFirstLastName: resultUser.pacientFirstLastName,
    email: resultUser.email,
    appointments: resultUser.appointments,
  };
};

export const loginUserService = async (userCredentials: UserLoginDTO) => {
  const credential: Credential = await validateCredential(userCredentials.username, userCredentials.password
  );

  const userFound: User | null = await userRepository.findOne({
    where: {
      credentials: {
        id: credential.id,
      },
    },
  });
  if (!userFound) {
    throw new Error("Usuario no encontrado");
  }
  return {
    id: userFound.id,
    pacientFirstName: userFound.pacientFirstName,
    pacientFirstLastName: userFound.pacientFirstLastName,
    email: userFound.email,
    appointments: userFound.appointments,
  };
};
