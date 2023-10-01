import { getLinkFromDb, getModLinkFromDb } from "@/lib/db";

export default async function LinkTableComponent() {
  const linksResponse = await getModLinkFromDb();
  return <div>{linksResponse && JSON.stringify(linksResponse)}</div>;
}
