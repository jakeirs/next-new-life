import { helloWorldDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const db = await helloWorldDb();
  console.log("db", db.latency, db.dbResponse);

  return NextResponse.json(`DB latency is ${db.latency}ms`);
}

export const revalidate = 0;
