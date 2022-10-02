import { Request, Response } from "express";
import * as mapService from "../services/mapService";
import { UserMapsData } from "../types/userMapTypes";

export async function getMap(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const result = await mapService.getMapByUserId(userId);
  res.status(200).send(result);
}

export async function updateMap(req: Request, res: Response) {
  const userMaps: UserMapsData[] = req.body;
  const userId: number = res.locals.userId;
  const result = await mapService.updateMap(userId, userMaps);
  res.status(201).send(result);
}
