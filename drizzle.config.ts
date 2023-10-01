import { cwd } from "node:process";
import { loadEnvConfig } from "@next/env";
import type { Config } from "drizzle-kit";

loadEnvConfig(cwd());

if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
  throw new Error("NEXT_PUBLIC_DATABASE_URL is missing in .env.local");
}

export default {
  schema: "./src/lib/schema.js",
  out: "./src/lib/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
} satisfies Config;
