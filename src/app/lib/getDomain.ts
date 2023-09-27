export function getDomain() {
  const isProduction = process.env.DOMAIN !== "localhost:3000";
  const domain = process.env.DOMAIN;
  const protocol = isProduction ? "https://" : "http://";
  return `${protocol}${domain}`;
}
