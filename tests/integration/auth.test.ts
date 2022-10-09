import { app } from "../../src/app";
import supertest from "supertest";
import { prisma } from "../../src/database/database";
import { createUserData } from "../factories/authFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "UserMaps" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
});

describe("POST /signup -> create user", () => {
  it("return 201 for created", async () => {
    const body = createUserData;

    const result = await supertest(app).post("/signup").send(body);
    expect(result.status).toEqual(201);
    const userCreated = await prisma.users.findFirst({
      where: { email: body.email },
    });
    expect(userCreated).not.toBeNull();
  });
  it("returns 409 for conflict", async () => {
    const body = createUserData;
    await supertest(app).post("/signup").send(body);
    const result = await supertest(app).post("/signup").send(body);

    expect(result.status).toEqual(409);
  });
});

describe("POST /signin -> user login", () => {
  it("return 200 for success login", async () => {
    const create = createUserData;
    await supertest(app).post("/signup").send(create);
    const login = { email: create.email, password: create.password };
    const result = await supertest(app).post("/signin").send(login);
    expect(result.status).toEqual(200);
    expect(typeof result.text).toBe("string");
  });
  it("return 401 for incorrect email", async () => {
    const create = createUserData;
    await supertest(app).post("/signup").send(create);
    const login = { email: "1" + create.email, password: create.password };
    const result = await supertest(app).post("/signin").send(login);
    expect(result.status).toEqual(401);
  });

  it("return 401 for incorrect password", async () => {
    const create = createUserData;
    await supertest(app).post("/signup").send(create);
    const login = { email: create.email, password: "1" + create.password };
    const result = await supertest(app).post("/signin").send(login);
    expect(result.status).toEqual(401);
  });
});
afterAll(async () => {
  await prisma.$disconnect();
});
