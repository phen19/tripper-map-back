import { Router } from "express";
import userRouter from "./userRouter";
import mapRouter from "./mapRouter";

const router = Router();
router.use(userRouter);
router.use(mapRouter);
export default router;
