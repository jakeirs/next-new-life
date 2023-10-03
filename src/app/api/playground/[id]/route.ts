import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {

  return NextResponse.json({ add: "Special for you", id: context.params.id });
}
