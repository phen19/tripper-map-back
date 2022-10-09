import { jest } from "@jest/globals";

import * as mapServices from "../../src/services/mapService";
import * as mapRepository from "../../src/repositories/mapRepository";
import { updateUserMap, userMap } from "../factories/mapFactory";

jest.mock("../../src/repositories/mapRepository");

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("GET: user map", () => {
  it("get user map", async () => {
    const map = userMap;
    jest.spyOn(mapRepository, "findByUserId").mockResolvedValue(map);

    const result = await mapServices.getMapByUserId(1);
    expect(result.length).toEqual(27);
    expect(result).toEqual(map);
  });
});

describe("PATCH: update user map", () => {
  it("update user map", async () => {
    const update = updateUserMap;

    jest
      .spyOn(mapRepository, "updateMap")
      .mockImplementationOnce((): any => {});

    await expect(mapServices.updateMap(1, update)).resolves.not.toThrow();
    expect(mapRepository.updateMap).toBeCalled();
  });
});
