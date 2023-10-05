import * as jose from "jose";
import { cookies } from "next/headers";

const secret = jose.base64url.decode(process.env.JOSE_SESSION_KEY);
const issuer = "urn:app-name:issuer";
const audience = "urn:app-name:audience";
const expiresAt = "10s";

export const encodeUserSession = async (userId) => {
  const jwt = await new jose.EncryptJWT({ user: userId })
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(expiresAt)
    .encrypt(secret);

  console.log(jwt);

  return jwt;
};

export const decodeUserSession = async (jwt) => {
  try {
    const { payload } = await jose.jwtDecrypt(jwt, secret, {
      issuer,
      audience,
    });
    const { user } = payload;
    return user;
  } catch (error) {
    console.log("User is not authenticated!");
  }
  return null;
};

export async function setSessionUser(userId) {
  const newSessionValue = await encodeUserSession(userId);
  // call in route.js
  cookies().set("session_id", newSessionValue);
}

export async function getSessionUser() {
  // call in route.js
  const cookieSessionsValue = cookies().get("session_id").value;
  if (!cookieSessionsValue) {
    return null;
  }

  const extractedUserId = await decodeUserSession(cookieSessionsValue);
  if (!extractedUserId) {
    return null;
  }

  return extractedUserId;
}
