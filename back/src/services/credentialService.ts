import { EntityManager } from "typeorm";
import { Credential } from "../entities/Credential.entity";
import bcrypt from "bcryptjs";
import { credentialRepository } from "../config/data-source";

// Implementar una función que recibirá username y password, y deberá chequear si el nombre de usuario existe entre los datos disponibles y, si es así, si el password es correcto. En caso de que la validación sea exitosa, deberá retornar el ID de las credenciales.
export const checkUsernameExist = async (username: string): Promise<void> => {
  const usernameFound: Credential | null = await credentialRepository.findOne({
    where: { username },
  });
  if (usernameFound)
    throw new Error(
      `El usuario con username ${username} ya existe, por favor intente con otro usuario`
    );
};

// Implementar una función que reciba username y password y cree un nuevo par de credenciales con estos datos.
export const createCredentialService = async (entityManager: EntityManager, username: string, password: string): Promise<Credential> => {
  await checkUsernameExist(username);
  const hashPassword = await bcrypt.hash(password, 10);

  const newCredential = entityManager.create(Credential, {
    username,
    password: hashPassword,
  });
  const credentialSave = await entityManager.save(Credential, newCredential);
  return credentialSave;
};

export const validateCredential = async (
  username: string,
  password: string
): Promise<Credential> => {
  const credentialFound: Credential | null = await credentialRepository.findOne(
    {
      where: { username },
    }
  );

  if (!credentialFound) {
    throw new Error(`Credenciales incorrectas`);
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    credentialFound.password!
  );

  if (isPasswordValid) {
    return credentialFound;
  } else {
    throw new Error(`Credenciales incorrectas`);
  }
};

