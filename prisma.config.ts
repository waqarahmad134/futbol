// Prisma 7 config: connection URL for the CLI (migrate, db push).
// The runtime client gets the same URL through the PrismaMariaDb
// adapter in src/lib/prisma.ts.
// The URL comes from DATABASE_URL when set; otherwise it falls back to
// the hard-coded Hostinger MySQL connection (Waqar's order), so
// migrate commands work even without an env var configured.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL || "mysql://u442793684_futbol:AAaa11%40%40AA%232026@srv485.hstgr.io:3306/u442793684_futbol",
  },
});
