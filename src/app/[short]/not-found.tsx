import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found the short link slug: 404</h2>
      <Link href="/">Return Home</Link>
    </div>
  );
}
