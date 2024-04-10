import { sign, verify } from "jsonwebtoken";
import { AUTH_SECRET } from "@/utils/constants";

if (!AUTH_SECRET) {
  throw new Error("Kindly check env secret");
}

const SECRET = AUTH_SECRET as string;

export function encryptCode(code: string) {
  const token = sign({ code }, SECRET, {
    expiresIn: "10m",
    algorithm: "HS256",
  });
  return token;
}

export function decryptCode(token: any) {
  try {
    const decoded = verify(token, SECRET, { algorithms: ["HS256"] });
    return decoded;
  } catch (error) {
    return error;
  }
}
