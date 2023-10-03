import { getUrlBaseOnSlugFromDb } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

export default async function ShortLinkPage({
  params,
}: {
  params: { short: string };
}) {
  const [dbRecord] = await getUrlBaseOnSlugFromDb(params.short);
  if (!dbRecord) {
    notFound();
  }
  const { url } = dbRecord;
  if (!url) {
    notFound();
  }

  // redirect(url);

  return <div>ShortLinkPage: {JSON.stringify(dbRecord)}</div>;
}
 