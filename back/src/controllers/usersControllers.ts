import { Request, Response } from "express";
import {
  createUserService,
  getAllUsersService,
  getUsersByIdService,
} from "../services/userService";
import {  IUserResponseDTO } from "../dtos/IUserDTO";
import { checkUserCredential } from "../services/credentialService";

// GET /users => Obtener el listado de todos los usuarios.

export const getUsersController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users: IUserResponseDTO[] = await getAllUsersService();
    res.status(200).json({
      message: "Obtener el listado de todos los usuarios",
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
      message: "Obtener el detalle de un usuario específico",
      data: user,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocurrió un error",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// POST /users/register => Registro de un nuevo usuario.
export const registerController = async (req: Request, res: Response) => {
  try {
    const newUser: IUserResponseDTO = await createUserService(req.body);
    res.status(200).json({
      message: "Registro de un nuevo usuario",
      data: newUser,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocurrió un error",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// POST /users/login => Login del usuario a la aplicación.
export const loginController = async (req: Request, res: Response) => {
  try {
    const {username, password} = req.body
    const CredentialId= await checkUserCredential (username, password);
    res.status(200).json({
      message: "Login del usuario a la aplicación",
      data: CredentialId,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocurrió un error",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};