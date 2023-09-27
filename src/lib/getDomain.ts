export function getDomain() {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV !== "development";
  const domain = process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000";
  const protocol = isProduction ? "https://" : "http://";

  console.log("`${protocol}${domain}`", `${protocol}${domain}`);

  return `${protocol}${domain}`;
}
