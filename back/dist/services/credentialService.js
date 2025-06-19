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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredential = exports.createCredentialService = exports.checkUsernameExist = void 0;
const Credential_entity_1 = require("../entities/Credential.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const data_source_1 = require("../config/data-source");
// Implementar una función que recibirá username y password, y deberá chequear si el nombre de usuario existe entre los datos disponibles y, si es así, si el password es correcto. En caso de que la validación sea exitosa, deberá retornar el ID de las credenciales.
const checkUsernameExist = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const usernameFound = yield data_source_1.credentialRepository.findOne({
        where: { username },
    });
    if (usernameFound)
        throw new Error(`El usuario con username ${username} ya existe, por favor intente con otro usuario`);
});
exports.checkUsernameExist = checkUsernameExist;
// Implementar una función que reciba username y password y cree un nuevo par de credenciales con estos datos.
const createCredentialService = (entityManager, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.checkUsernameExist)(username);
    const hashPassword = yield bcryptjs_1.default.hash(password, 10);
    const newCredential = entityManager.create(Credential_entity_1.Credential, {
        username,
        password: hashPassword,
    });
    const credentialSave = yield entityManager.save(Credential_entity_1.Credential, newCredential);
    return credentialSave;
});
exports.createCredentialService = createCredentialService;
const validateCredential = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialFound = yield data_source_1.credentialRepository.findOne({
        where: { username },
    });
    if (!credentialFound) {
        throw new Error(`Credenciales incorrectas`);
    }
    const isPasswordValid = yield bcryptjs_1.default.compare(password, credentialFound.password);
    if (isPasswordValid) {
        return credentialFound;
    }
    else {
        throw new Error(`Credenciales incorrectas`);
    }
});
exports.validateCredential = validateCredential;
