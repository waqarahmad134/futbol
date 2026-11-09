// Prisma 7 config: connection URL for the CLI (migrate, db push).
// The runtime client gets the same URL through the PrismaMariaDb
// adapter in src/lib/prisma.ts.
// The placeholder keeps `prisma generate` and `prisma validate`
// working without a database configured; any command that actually
// needs the database (migrate deploy, db push) fails at connection
// time until a real DATABASE_URL is set. Never put a real credential
// here; set DATABASE_URL in .env (see .env.example).
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL || "mysql://127.0.0.1:3306/futbol11",
  },
});
