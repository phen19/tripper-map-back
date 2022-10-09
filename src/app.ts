import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import router from "./routers/index";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

export const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandler);
