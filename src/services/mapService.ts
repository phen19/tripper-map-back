import * as mapRepository from "../repositories/mapRepository";
import { UserMapsData } from "../types/userMapTypes";
import { userCheck } from "../utils/utils";

async function getMapByUserId(userId: number) {
  await userCheck(userId);
  const result = await mapRepository.findByUserId(userId);
  return result;
}

async function updateMap(userId: number, userMaps: UserMapsData[]) {
  await userCheck(userId);
  const result = await mapRepository.updateMap(userId, userMaps);
  return result;
}

export { getMapByUserId, updateMap };
