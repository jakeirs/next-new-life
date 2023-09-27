"use client";

import { useEffect } from "react";

interface Props {
  error: Error;
  reset: () => void;
}

const Error: React.FC<Props> = ({ error, reset }) => {
  useEffect(() => {
    console.log("error effect", error);
  }, [error]);
  return (
    <div>
      <div>Something went wrong!</div>
      <button onClick={reset}>Retry</button>
    </div>
  );
};

export default Error;
