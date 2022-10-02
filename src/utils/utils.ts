import * as userRepository from "../repositories/userRepository";

export async function userCheck(id: number) {
  const existingUser = await userRepository.findById(id);
  if (!existingUser) {
    throw { code: "NotFound", message: "User not found" };
  }
}
