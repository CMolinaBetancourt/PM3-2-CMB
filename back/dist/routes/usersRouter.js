"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersControllers_1 = require("../controllers/usersControllers");
const usersRouter = (0, express_1.Router)();
// GET /users => Obtener el listado de todos los usuarios.
usersRouter.get("/", usersControllers_1.getUsersController);
// GET /users/:id => Obtener el detalle de un usuario específico.
usersRouter.get("/:id", usersControllers_1.getUserByIdController);
// POST /users/register => Registro de un nuevo usuario.
usersRouter.post("/register", usersControllers_1.registerController);
// POST /users/login => Login del usuario a la aplicación.
usersRouter.post("/login", usersControllers_1.loginController);
exports.default = usersRouter;
