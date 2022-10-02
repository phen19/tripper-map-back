import * as userRepository from "../repositories/userRepository";
import * as mapRepository from "../repositories/mapRepository";
import { UserData } from "../types/userTypes";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

async function createUser(UserData: UserData) {
  const existingEmail = await userRepository.findByEmail(UserData.email);
  if (existingEmail) {
    throw { code: "Conflict", message: "Email already registered" };
  }

  const passwordEncrypted = bcrypt.hashSync(UserData.password, 10);
  const user: UserData = {
    email: UserData.email,
    password: passwordEncrypted,
  };

  const result = await userRepository.createUser(user);
  await mapRepository.createUserMap(result.id);
}

async function signIn(UserData: UserData) {
  const existingEmail = await userRepository.findByEmail(UserData.email);
  if (!existingEmail) {
    throw { code: "Unauthorized", message: "Incorrect e-mail and/or password" };
  }
  const checkPassword = bcrypt.compareSync(
    UserData.password,
    existingEmail.password
  );
  if (!checkPassword) {
    throw { code: "Unauthorized", message: "Incorrect e-mail and/or password" };
  }

  const secretKey: string | undefined = process.env.JWT_SECRET;
  const token: string = jwt.sign({ id: existingEmail.id }, secretKey!);
  return token;
}

export { createUser, signIn };
