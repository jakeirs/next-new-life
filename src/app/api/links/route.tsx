import isValidURL from "@/app/lib/isValidURL";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json("Link responded");
}

export async function POST(req: NextRequest) {
  const contentType = await req.headers.get("content-type");
  const postData = await req.json();
  const validURL = await isValidURL(postData.url, [
    process.env.NEXT_PUBLIC_VERCEL_URL,
  ]);

  if (contentType !== "application/json") {
    return NextResponse.json({ message: "Invalid headers" }, { status: 415 });
  }

  if (!validURL) {
    return NextResponse.json(
      { message: `This url: ${postData.url} - is invalid` },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Link POST responded", data: postData });
}
