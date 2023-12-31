import { getDomain } from "@/lib/getDomain";

async function getData() {
  const domain = getDomain();
  const endpoint = `${domain}/api/playground`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  if (res.headers.get("content-type") !== "application/json") {
    return { items: [] };
  }

  return res.json();
}

export default async function BlogPage() {
  // const data = await getData();
  // return <div>{JSON.stringify(data)}</div>;

  return <div>Blog</div>;
}
