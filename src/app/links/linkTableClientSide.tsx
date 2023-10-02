"use client";

import useSWR from "swr";
import CreateForm from "./createForm";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const endpoint = "/api/links";

export default function LinkTableClientSide() {
  const { data, error, isLoading, mutate } = useSWR(endpoint, fetcher);

  if (error) return "An error happened";
  if (isLoading) return "Loading...";

  const didSubmit = () => {
    mutate();
  };

  console.log("data.links", data);

  return (
    <div>
      <CreateForm didSubmit={didSubmit} />
      <div>LinkTableClientSide: {JSON.stringify(data)}</div>
    </div>
  );
}
