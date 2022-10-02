import { Router } from "express";
import * as mapController from "../controllers/mapController";
import { tokenValidationMiddleware } from "../middlewares/tokenMiddleware";

const mapRouter = Router();

mapRouter.get("/map", tokenValidationMiddleware, mapController.getMap);
mapRouter.patch("/map", tokenValidationMiddleware, mapController.updateMap);

export default mapRouter;
