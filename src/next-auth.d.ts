import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";

type SessionData = {
  id: string;
  email: string;
  image: string;
  name: String;
};

declare module "next-auth" {
  interface Session {
    user: SessionData;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: SessionData;
  }
}
