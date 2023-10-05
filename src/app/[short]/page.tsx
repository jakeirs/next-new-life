import { getLinkAndVisitsFromDb, getUrlBaseOnSlugFromDb } from "@/lib/db";
import { getDomain } from "@/lib/getDomain";
import { notFound, redirect } from "next/navigation";

async function triggerVisit(linkId: any) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ linkId }),
  };
  const domain = getDomain();
  const endpoint = `${domain}/api/visists`;
  return await fetch(endpoint, options);
}

export default async function ShortLinkPage({
  params,
}: {
  params: { short: string };
}) {
  const [dbRecord] = await getUrlBaseOnSlugFromDb(params.short);
  const [dbRecordLinkAndVisits] = await getLinkAndVisitsFromDb();
  if (!dbRecord) {
    notFound();
  }
  const { url, id } = dbRecord;
  if (!url) {
    notFound();
  }

  if (id) {
    await triggerVisit(id);
  }

  // redirect(url);

  return <pre>{JSON.stringify(dbRecordLinkAndVisits, null, 4)}</pre>;
}
