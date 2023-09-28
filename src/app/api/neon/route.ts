import { helloWorldDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const db = await helloWorldDb();
  return NextResponse.json(`DB latency is${db.latency} `);
}
