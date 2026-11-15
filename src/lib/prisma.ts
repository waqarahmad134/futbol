// Prisma client singleton (same pattern as the HS Property clone).
// Prisma 7 needs a driver adapter for a direct MySQL connection, so
// the client is built on PrismaMariaDb (MariaDB driver speaks the
// MySQL protocol, and DATABASE_URL is a mysql:// URL).
// The URL comes from DATABASE_URL when set; otherwise it falls back to
// the hard-coded Hostinger MySQL connection (Waqar's order), so the
// backend works even without an env var configured. Env takes
// precedence whenever it is set.
// Returns null only when the URL cannot be used, so API routes can
// answer { backend: "unavailable" } instead of crashing the request.
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Hard-coded fallback (Waqar's order): used only when DATABASE_URL is not set.
const FALLBACK_DATABASE_URL =
  "mysql://u442793684_futbol:AAaa11%40%40AA%232026@srv485.hstgr.io:3306/u442793684_futbol";

function createClient(): PrismaClient | null {
  const url = process.env.DATABASE_URL || FALLBACK_DATABASE_URL;
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
