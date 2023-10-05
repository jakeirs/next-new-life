import { addLinkToDb, getLinkFromDb } from "@/lib/db";
import isValidURL from "@/lib/isValidURL";
import { setSessionUser } from "@/lib/sessions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  setSessionUser(12323);
  const dbResponse = await getLinkFromDb();
  return NextResponse.json(dbResponse);
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
  const dbResponse = await addLinkToDb(postData.url);
  const { data, status } = dbResponse;
  if (!dbResponse) {
    throw new Error("Error on inserting link to Db");
  }

  return NextResponse.json(data ? data : {}, { status: status ? status : 500 });
}
