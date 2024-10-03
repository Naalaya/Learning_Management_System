import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "jest-mock-extended";

// // Jest mocking
// jest.mock("@prisma/client", () => {
//   const prisma = mockDeep<PrismaClient>();
//   return {
//     PrismaClient: jest.fn(() => prisma),
//   };
// });

// // Reset mocks before each test
// beforeEach(() => {
//   const { PrismaClient } = jest.requireActual("@prisma/client");
//   mockReset(PrismaClient);
// });
const prisma = new PrismaClient();
beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});
