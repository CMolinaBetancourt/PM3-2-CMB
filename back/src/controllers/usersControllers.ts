import { Request, Response } from "express";
import {
  createUserService,
  getAllUsersService,
  getUsersByIdService,
  loginUserService,
} from "../services/userService";
import { IUserResponseDTO, UserLoginDTO } from "../dtos/IUserDTO";
import { PostgresError } from "../interfaces/PostgressErrorInterface";

// GET /users => Obtener el listado de todos los usuarios.

export const getUsersController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users: IUserResponseDTO[] = await getAllUsersService();
    res.status(200).json({
      message: "Este es el listado de todos los pacientes",
      data: users,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocurrió un error",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// GET /users/:id => Obtener el detalle de un usuario específico.
export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // tengo que enviarle el id y debe ser tipo number
    const user: IUserResponseDTO | undefined = await getUsersByIdService(
      Number(id)
    );
    res.status(200).json({
      message: "Esta es la información del usuario",
      data: user,
    });
  } catch (error: unknown) {
    res.status(404).json({
      message: "Ocurrió un error",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// POST /users/register => Registro de un nuevo usuario.
export const registerController = async (req: Request, res: Response) => {
  try {
    const newUser: IUserResponseDTO = await createUserService(req.body);
    res.status(201).json({
      message: "El usuario fue creado exitosamente",
      data: newUser,
    });
  } catch (error: unknown) {
    const err = error as PostgresError;
    res.status(400).json({
      message: "Ocurrió un error",
      error:
        error instanceof Error
          ? err.detail
            ? err.detail
            : err.message
          : "Error desconocido",
    });
  }
};

// POST /users/login => Login del usuario a la aplicación.
export const loginController = async (req: Request<unknown, unknown, UserLoginDTO>, res: Response) => {
  try {
    const { username, password } = req.body;
    const CredentialId = await loginUserService({username, password});
    res
      .status(200)
      .json({
        message: "Usuario logeado exitósamente",
        login: true,
        user: CredentialId,
      });
  } catch (error: unknown) {
    res.status(400).json({
      message: "Ocurrió un error",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
