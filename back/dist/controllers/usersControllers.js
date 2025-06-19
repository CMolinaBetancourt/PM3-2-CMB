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
exports.loginController = exports.registerController = exports.getUserByIdController = exports.getUsersController = void 0;
const userService_1 = require("../services/userService");
// GET /users => Obtener el listado de todos los usuarios.
const getUsersController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getAllUsersService)();
        res.status(200).json({
            message: "Obtener el listado de todos los usuarios",
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Ocurrió un error",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
});
exports.getUsersController = getUsersController;
// GET /users/:id => Obtener el detalle de un usuario específico.
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; // tengo que enviarle el id y debe ser tipo number
        const user = yield (0, userService_1.getUsersByIdService)(Number(id));
        res.status(200).json({
            message: "Obtener el detalle de un usuario específico",
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Ocurrió un error",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
});
exports.getUserByIdController = getUserByIdController;
// POST /users/register => Registro de un nuevo usuario.
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield (0, userService_1.createUserService)(req.body);
        res.status(201).json({
            message: "El usuario fue creado exitosamente",
            data: newUser,
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: "Ocurrió un error",
            error: error instanceof Error
                ? err.detail
                    ? err.detail
                    : err.message
                : "Error desconocido",
        });
    }
});
exports.registerController = registerController;
// POST /users/login => Login del usuario a la aplicación.
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const CredentialId = yield (0, userService_1.loginUserService)({ username, password });
        res
            .status(200)
            .json({
            message: "Usuario logeado exitósamente",
            login: true,
            user: CredentialId,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Ocurrió un error",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
});
exports.loginController = loginController;
