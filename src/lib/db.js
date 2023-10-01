import { neon, neonConfig } from "@neondatabase/serverless";
import { FiutyTable } from "./schema";
import { drizzle } from "drizzle-orm/neon-http";
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);

neonConfig.fetchConnectionCache = true;
const db = drizzle(sql);

export const helloWorldFromDb = async () => {
  const start = new Date();
  const dbResponse = await sql`SELECT NOW()`;
  const end = new Date();

  return dbResponse;
};

async function configureDatabase() {
  const dbResponse = await sql`CREATE TABLE IF NOT EXISTS "fiuty" (
    "id" serial PRIMARY KEY NOT NULL,
    "url" text NOT NULL,
    "created_at" timestamp DEFAULT now(),
    "text" text NOT NULL
  );
  `;
  console.log("dbResponse", dbResponse);
}

configureDatabase().catch((error) => console.log("configureDatabase ", error));

export async function addLinkToDb(newUrl) {
  const newLink = { url: newUrl, text: "Siema" };
  return await db.insert(FiutyTable).values(newLink).returning();
}

export async function getLinkFromDb({ limit = 10, offset = 0 } = {}) {
  const pagination = { limit, offset };

  return await db
    .select()
    .from(FiutyTable)
    .limit(pagination.limit)
    .offset(pagination.off);
}

export async function getModLinkFromDb({ limit = 10, offset = 0 } = {}) {
  const pagination = { limit, offset };

  return await db
    .select({
      myModifiedId: FiutyTable.id,
      myUrl: FiutyTable.url,
      timestamp: FiutyTable.createdAt,
    })
    .from(FiutyTable)
    .limit(pagination.limit)
    .offset(pagination.off);
}
