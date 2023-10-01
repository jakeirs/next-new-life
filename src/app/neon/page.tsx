"use client";
import { helloWorldFromDb } from "@/lib/db";
import { useEffect } from "react";

export default function NeonPage() {
  const initDbCall = async () => {
    const dbResponse = await helloWorldFromDb();
  };

  useEffect(() => {
    initDbCall().catch((error) => error);
  }, []);

  return <div>page</div>;
}
