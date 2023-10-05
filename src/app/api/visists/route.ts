import { saveLinkVisit } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { linkId } = data;
  const result = await saveLinkVisit(linkId);

  return NextResponse.json({}, { status: 201 });
}
