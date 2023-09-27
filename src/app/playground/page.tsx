"use client";

import { getDomain } from "@/lib/getDomain";
import { useEffect } from "react";

interface Props {}

const PlaygroundPage: React.FC<Props> = () => {
  useEffect(() => {
    const domain = getDomain();

    fetch(`${domain}/api/playground`, {
      method: "POST",
      body: JSON.stringify({
        product: "Product Siema",
      }),
    }).catch((error) => console.log("error", error));
  }, []);

  return <div>Siema</div>;
};

export default PlaygroundPage;
