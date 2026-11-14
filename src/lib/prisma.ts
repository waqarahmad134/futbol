// Prisma client singleton (same pattern as the HS Property clone).
// Prisma 7 needs a driver adapter for a direct MySQL connection, so
// the client is built on PrismaMariaDb (MariaDB driver speaks the
// MySQL protocol, and DATABASE_URL is a mysql:// URL).
// Returns null when DATABASE_URL is not set, so the site keeps working
// on localStorage and API routes can answer { backend: "unavailable" }
// instead of crashing the build or the request.
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  try {
    const adapter = new PrismaMariaDb(url);
    return new PrismaClient({ adapter });
  } catch {
    return null;
  }
}

export const prisma: PrismaClient | null = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}

export function isBackendAvailable(): boolean {
  return prisma !== null;
}
