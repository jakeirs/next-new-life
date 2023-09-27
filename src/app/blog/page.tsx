async function getData() {
  const endpoint = "http://localhost:3000/api/playground";
  const res = await fetch(endpoint);
  console.log("res", res);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface Props {}

const BlogPage: React.FC<Props> = async () => {
  const data = await getData();

  console.log("data", data);
  return <div>{JSON.stringify(data)}</div>;
};

export default BlogPage;
