import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";
import userRouter from "../src/routers/userRouter";
import mapRouter from "../src/routers/mapRouter";
import e2eRouter from "../src/routers/e2eRouter";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

if (process.env.NODE_ENV === "test") {
  app.use(e2eRouter);
}
app.use(userRouter);
app.use(mapRouter);
app.use(errorHandler);
console.log(process.env.NODE_ENV);
export default app;
