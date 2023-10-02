import { getLinkFromDb } from "@/lib/db";

export default async function LinkTableComponent() {
  const linksResponse = await getLinkFromDb();
  return <div>{linksResponse && JSON.stringify(linksResponse)}</div>;
}
