import { Router } from "express";
import * as userController from "../controllers/userController";
import { schemaValidator } from "../middlewares/schemaValidator";
import { schemas } from "../schemas/schema";

const userRouter = Router();

userRouter.post(
  "/signup",
  schemaValidator(schemas.userSchema),
  userController.signUp
);
userRouter.post(
  "/signin",
  schemaValidator(schemas.userSchema),
  userController.signIn
);

export default userRouter;
