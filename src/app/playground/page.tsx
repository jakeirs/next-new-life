"use client";

import { useEffect } from "react";

interface Props {}

const BlogPage: React.FC<Props> = () => {
  useEffect(() => {
    fetch("https://localhost:3000" + "/api/playground    ", {
      method: "POST",
      body: JSON.stringify({
        product: "Product Siema",
      }),
    }).catch((error) => console.log("error", error));
  }, []);

  return <div>Siema</div>;
};

export default BlogPage;
