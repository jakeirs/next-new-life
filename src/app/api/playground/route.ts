import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.json({ add: "Special for you" });
}

export async function POST(req: Request) {
  const data = await req.json();

  return NextResponse.json({ ...data, add: "Special for you" });
}
