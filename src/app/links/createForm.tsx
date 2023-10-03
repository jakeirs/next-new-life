"use client";

import { getDomain } from "@/lib/getDomain";
import { useState } from "react";

const endpoint = `${getDomain()}/api/links`;

export default function CreateForm({ didSubmit }: { didSubmit(): void }) {
  const [result, setResult] = useState<any>(null);
  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formKeysValues = Object.fromEntries(formData);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formKeysValues),
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    setResult(JSON.stringify(result));

    if (didSubmit) {
      didSubmit();
    }
  };

  return (
    <form
      onSubmit={handleForm}
      className="flex flex-col gap-5 justify-center items-center content-between"
    >
      <input type="text" name="url" placeholder="Your url to shrten" />
      <input type="text" name="piki" placeholder="Myszka" />
      <button type="submit"> Shorten</button>
      <p>Added:</p>
      <p>{result}</p>
      <br />
    </form>
  );
}
