"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = exports.createUserService = exports.getUsersByIdService = exports.getAllUsersService = void 0;
const data_source_1 = require("../config/data-source");
const User_entity_1 = require("../entities/User.entity");
const credentialService_1 = require("./credentialService");
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
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield data_source_1.userRepository.find();
    return users.map((user) => ({
        id: user.id,
        pacientFirstName: user.pacientFirstName,
        pacientFirstLastName: user.pacientFirstLastName,
        email: user.email,
        appointments: user.appointments,
    }));
});
exports.getAllUsersService = getAllUsersService;
// Implementar una función que pueda retornar un elemento del arreglo que haya sido identificado por id.
const getUsersByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield data_source_1.userRepository.findOne({
        where: { id },
        relations: {
            appointments: true,
        },
    });
    if (!userFound)
        throw new Error(`El usuario con id ${id} no fue encontrado`);
    return {
        id: userFound.id,
        pacientFirstName: userFound.pacientFirstName,
        pacientFirstLastName: userFound.pacientFirstLastName,
        email: userFound.email,
        appointments: userFound.appointments,
    };
});
exports.getUsersByIdService = getUsersByIdService;
// Implementar una función que pueda crear un nuevo usuario dentro del arreglo PERO ten en cuenta que al momento de crear el usuario, debe crear su correspondiente par de credenciales llamando a la función correspondiente del servicio de credenciales. Al recibir de esta función el id de las credenciales, debe guardar el dato en la propiedad credentialsId.
const createUserService = (userDTO) => __awaiter(void 0, void 0, void 0, function* () {
    const resultUser = yield data_source_1.AppDataSource.transaction((entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const newCredential = yield (0, credentialService_1.createCredentialService)(entityManager, userDTO.username, userDTO.password);
        const newUser = entityManager.create(User_entity_1.User, {
            pacientFirstName: userDTO.pacientFirstName,
            pacientFirstLastName: userDTO.pacientFirstLastName,
            birthdate: new Date(userDTO.birthdate),
            nDni: userDTO.nDni,
            parentName: userDTO.parentName,
            parentLastName: userDTO.parentLastName,
            email: userDTO.email,
            credentials: newCredential,
        });
        const results = yield entityManager.save(User_entity_1.User, newUser);
        return results;
    }));
    return {
        id: resultUser.id,
        pacientFirstName: resultUser.pacientFirstName,
        pacientFirstLastName: resultUser.pacientFirstLastName,
        email: resultUser.email,
        appointments: resultUser.appointments,
    };
});
exports.createUserService = createUserService;
const loginUserService = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    const credential = yield (0, credentialService_1.validateCredential)(userCredentials.username, userCredentials.password);
    const userFound = yield data_source_1.userRepository.findOne({
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
});
exports.loginUserService = loginUserService;
