import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);

export async function helloWorldDb() {
  const start = new Date(); // check latency of the databae connection
  const [dbResponse] = await sql`SELECT NOW()`;
  const end = new Date(); // check latency of the databae connection

  return { dbResponse, latency: Math.abs(start - end) };
}
