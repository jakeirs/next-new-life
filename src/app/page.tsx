import { getSessionUser } from "@/lib/sessions";
import Image from "next/image";

export default async function Home() {
  const userId = await getSessionUser();
  if (!userId) {
    return <div>Session Expired</div>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Session of the userId: {userId}
    </main>
  );
}
