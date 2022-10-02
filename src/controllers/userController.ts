import { Request, Response } from "express";
import { UserData } from "../types/userTypes";
import * as userService from "../services/userService";

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;
  const user: UserData = {
    email,
    password,
  };
  await userService.createUser(user);
  res.status(201).send("Created user");
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;
  const user: UserData = {
    email,
    password,
  };
  const result: String = await userService.signIn(user);
  res.status(200).send(result);
}
