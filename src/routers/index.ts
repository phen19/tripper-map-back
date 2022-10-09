import { Router } from "express";
import userRouter from "./userRouter";
import mapRouter from "./mapRouter";
import e2eRouter from "./e2eRouter";

const router = Router();
router.use(userRouter);
router.use(mapRouter);
router.use(e2eRouter);

export default router;
