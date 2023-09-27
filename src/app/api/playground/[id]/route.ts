import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {
  console.log("context", context);

  return NextResponse.json({ add: "Special for you", id: context.params.id });
}
