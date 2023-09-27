"use client";

import { useState } from "react";
import { getDomain } from "../lib/getDomain";

const endpoint = `${getDomain()}/api/links`;

export default function CreateForm() {
  const [result, setResult] = useState(null);
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
    setResult(result?.message);
    console.log("result", result?.message);
  };

  return (
    <form
      onSubmit={handleForm}
      className="flex flex-col gap-5 justify-center items-center content-between"
    >
      <input type="text" name="url" placeholder="Your url to shrten" />
      <input type="text" name="piki" placeholder="Myszka" />
      <button type="submit"> Shorten</button>

      <p>{result}</p>
    </form>
  );
}
