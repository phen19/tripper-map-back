import { app } from "../../src/app";
import supertest from "supertest";
import { prisma } from "../../src/database/database";
import { createUserData } from "../factories/authFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "UserMaps" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
});

describe("GET /map -> get user map", () => {
  it("return 200 and body with 27 states of Brazil", async () => {
    const body = createUserData;
    await supertest(app).post("/signup").send(body);
    const user = { email: body.email, password: body.password };
    const login = await supertest(app).post("/signin").send(user);
    expect(typeof login.text).toBe("string");
    const token = login.text;

    const result = await supertest(app)
      .get("/map")
      .set("Authorization", "Bearer " + token)
      .send();
    expect(result.status).toEqual(200);
    expect(result.body.length).toEqual(27);
  });
});

describe("PATCH /map -> update user map", () => {
  it("return 201 for user map updated", async () => {
    const body = createUserData;
    await supertest(app).post("/signup").send(body);
    const user = { email: body.email, password: body.password };
    const login = await supertest(app).post("/signin").send(user);
    expect(typeof login.text).toBe("string");
    const token = login.text;
    const updatedMap = [
      {
        uf: "ac",
        status: "wishlist",
      },
    ];
    const result = await supertest(app)
      .patch("/map")
      .set("Authorization", "Bearer " + token)
      .send(updatedMap);
    expect(result.status).toEqual(201);
    const map = await prisma.userMaps.findUnique({
      where: {
        userId_uf: {
          userId: 1,
          uf: updatedMap[0].uf,
        },
      },
    });
    expect(map?.status).toEqual(updatedMap[0].status);
  });
});
afterAll(async () => {
  await prisma.$disconnect();
});
