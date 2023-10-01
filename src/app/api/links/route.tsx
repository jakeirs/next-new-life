import { addLinkToDb, getLinkFromDb } from "@/lib/db";
import isValidURL from "@/lib/isValidURL";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const dbResponse = await getLinkFromDb();
  console.log("dbResponsedbResponsedbResponsedbResponse", dbResponse);

  return NextResponse.json(dbResponse);
}

export async function POST(req: NextRequest) {
  const contentType = await req.headers.get("content-type");
  const postData = await req.json();
  console.log(
    "postDatapostDatapostDatapostDatapostDatapostDatapostDatapostDatapostDatapostDatapostData",
    postData
  );
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
  const dbResponse = await addLinkToDb(postData.url).catch((error) => {
    new Error("Something wrong with inserting to DB");
  });
  return NextResponse.json(validURL, { status: 201 });
}
