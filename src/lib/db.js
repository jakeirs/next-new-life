import { neon, neonConfig } from "@neondatabase/serverless";
import { LinksTable } from "./schema";
import { drizzle } from "drizzle-orm/neon-http";
import { desc } from "drizzle-orm";
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
  const dbResponse = await sql`CREATE TABLE IF NOT EXISTS "links" (
    "id" serial PRIMARY KEY NOT NULL,
    "url" text NOT NULL,
    "short" varchar(50),
    "created_at" timestamp DEFAULT now()
  );
  
  `;
  console.log("dbResponse CONFIGDB", dbResponse);
}

configureDatabase().catch((error) => console.log("configureDatabase ", error));

export async function addLinkToDb(newUrl) {
  const newLink = { url: newUrl, text: "KOPA" };
  console.log("newLink", newLink);
  return await db
    .insert(LinksTable)
    .values(newLink)
    .returning()
    .catch((error) => console.log("Error on trying to insert to db: ", error));
}

export async function getLinkFromDb({ limit = 10, offset = 0 } = {}) {
  const pagination = { limit, offset };

  return await db
    .select()
    .from(LinksTable)
    .limit(pagination.limit)
    .offset(pagination.off)
    .orderBy(desc(LinksTable.createdAt));
}
