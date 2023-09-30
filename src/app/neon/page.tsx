import { helloWorldDb } from "@/lib/db";

export default async function NeonConnectionPage() {
  const db = await helloWorldDb();
  console.log("db", db);
  return (
    <div>
      NeonConnectionPage<div>{db.latency}ms</div>
    </div>
  );
}

export const revalidate = 0;
