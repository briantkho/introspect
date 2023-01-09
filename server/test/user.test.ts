// import { PrismaClient } from "@prisma/client";
// import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
// import { Prisma } from "@prisma/client";

// import {
//   afterEach,
//   beforeEach,
//   describe,
//   expect,
//   it,
//   jest,
// } from "@jest/globals";
// // import supertest from "supertest";

// import app from "../server";
// import { createSession } from "../session";

// const client = new PrismaClient();
// // const request = supertest(app);

// jest.mock("../server.ts", () => ({
//   __esModule: true,
//   default: mockDeep<PrismaClient>(),
// }));

// beforeEach(() => {
//   mockReset(prismaMock);
// });

// export const prismaMock = app as unknown as DeepMockProxy<PrismaClient>;

// test("should create new user", async () => {
//   const defaultEmail = "me@email.com";
//   const username = "yeet";

//   const user = {
//     user_id: "123r5439",
//     first_name: "Brian",
//     last_name: "Ho",
//     user_name: username,
//     email: defaultEmail,
//     password: "Example1234",
//   };

//   prismaMock.user.create.mockResolvedValue(user);

//   await expect(createSession(user, request)).resolves.toEqual({
//     id: 1,
//     name: "Rich",
//     email: "hello@prisma.io",
//     acceptTermsAndConditions: true,
//   });
// });
