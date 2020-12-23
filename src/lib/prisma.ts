export * from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export const prisma: PrismaClient = process.browser
  ? (undefined as any)
  : new PrismaClient({
      log: ["query", "error", "info", "warn"],
    });
