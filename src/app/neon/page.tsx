import { helloWorldDb } from "../../lib/db";

export default async function NeonConnectionPage() {
  const elo = await helloWorldDb();

  return (
    <div>
      NeonConnectionPage<div>{elo.latency}ms</div>
    </div>
  );
}
  