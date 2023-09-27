"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GithubPage() {
  const myGithubProfile = "https://api.github.com/repos/jakeirs/next-new-life";
  const { data, error, isLoading } = useSWR(myGithubProfile, fetcher);

  if (error) return "An error happened";
  if (isLoading) return "Loading...";

  console.log("data?.owner?.login", data?.owner?.login);

  return <div>GithubPage: {data?.owner?.login}</div>;
} 
