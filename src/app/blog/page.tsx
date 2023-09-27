import { getDomain } from "../lib/getDomain";

async function getData() {
  const domain = getDomain();
  const endpoint = `${domain}/api/playground`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface Props {}

const BlogPage: React.FC<Props> = async () => {
  const data = await getData();

  return <div>{JSON.stringify(data)}</div>;
};

export default BlogPage;
