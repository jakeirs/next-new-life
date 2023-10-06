import { neon, neonConfig } from "@neondatabase/serverless";
import { randomShortStrings } from "./randomShortStrings";
import { LinksTable, VisitsTable } from "./schema";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/neon-http";
import { desc, eq, sql as sqlDriizle } from "drizzle-orm";
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);

neonConfig.fetchConnectionCache = true;
const db = drizzle(sql, { schema });

export const helloWorldFromDb = async () => {
  const start = new Date();
  const dbResponse = await sql`SELECT NOW()`;
  const end = new Date();

  return dbResponse;
};

async function configureDatabase() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS "links" (
      "id" serial PRIMARY KEY NOT NULL,
      "url" text NOT NULL,
      "short" varchar(50),
      "user_id" integer,
      "created_at" timestamp DEFAULT now()
    );`;
    await sql`CREATE TABLE IF NOT EXISTS "users" (
      "id" serial PRIMARY KEY NOT NULL,
      "username" varchar(50) NOT NULL,
      "password" varchar(75) NOT NULL,
      "email" text,
      "created_at" timestamp DEFAULT now()
    );`;
    await sql`CREATE TABLE IF NOT EXISTS "visits" (
      "id" serial PRIMARY KEY NOT NULL,
      "link_id" integer NOT NULL,
      "created_at" timestamp DEFAULT now()
    );`;
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS "username_idx" ON "users" ("username");`;
    await sql`DO $$ BEGIN
    ALTER TABLE "links" ADD CONSTRAINT "links_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;`;
    await sql`DO $$ BEGIN
    ALTER TABLE "visits" ADD CONSTRAINT "visits_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE no action ON UPDATE no action;
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;`;
    console.log("DB Configured sucessfully!");
  } catch (error) {
    console.log("Error while Configuration DB: ", error);
  }
}

configureDatabase().catch((error) => console.log("configureDatabase ", error));

export async function addLinkToDb(newUrl) {
  const newLink = {
    url: newUrl.toLowerCase(),
    short: randomShortStrings(newUrl),
  };
  let response = [{ message: `${newUrl} is not valid. Please try again` }];
  let status = 400;
  try {
    response = await db.insert(LinksTable).values(newLink).returning();
    status = 201;
  } catch ({ name, message }) {
    if (
      `${message}`.includes("duplicate key value violates unique constraint")
    ) {
      response = [
        { message: `${newUrl} is had been already added in the past` },
      ];
    }
  }
  return { data: response, status };
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

export async function getUrlBaseOnSlugFromDb(slugLinkValue) {
  console.log(slugLinkValue, slugLinkValue);
  return await db
    .select()
    .from(LinksTable)
    .where(eq(LinksTable.short, slugLinkValue));
}

export async function saveLinkVisit(linkIdValue) {
  return await db
    .insert(VisitsTable)
    .values({ linkId: linkIdValue })
    .returning();
}

export async function getLinkAndVisitsFromDb(
  shortUrl,
  { limit = 10, offset = 0 } = {}
) {
  const pagination = { limit, offset };

  return await db.query.LinksTable.findMany({
    limit: limit,
    offset: offset,
    orderBy: [desc(LinksTable.createdAt)],
    columns: {
      url: true,
      createdAt: true,
      short: true,
      userId: true,
    },
    where: eq(LinksTable.short, shortUrl),
    with: {
      visits: {
        limit: 10,
        columns: {
          createdAt: true,
          linkId: true,
        },
      },
    },
  });
}
