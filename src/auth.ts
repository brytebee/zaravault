import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";
import Google from "next-auth/providers/google";
import credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { User } from "@prisma/client";
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  AUTH_SECRET,
} from "@/utils/constants";

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !AUTH_SECRET) {
  throw new Error("Missing GitHub auth credentials!");
}

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !AUTH_SECRET) {
  throw new Error("Missing GitHub auth credentials!");
}

interface AuthProp {
  email: string;
  password: string;
}

async function authenticateUser({
  email,
  password,
}: AuthProp): Promise<User | null> {
  const user = await db.user.findUnique({ where: { email: email } });
  if (!user) return null;

  const verifyPassword = compare(password, user?.password || "");
  if (!verifyPassword) {
    throw new Error("Incorrect password");
  }
  return user;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 30,
  },
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "cutie@zara.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const validUser = await authenticateUser(credentials as AuthProp);
        if (validUser) {
          return validUser;
        }
        return null;
      },
    }),
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }: any) {
      if (session && user) {
        session.user.id = user.id;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.email = user.email;
        token.userId = user.id;
      }
      return token;
    },
  },
  secret: AUTH_SECRET,
  // pages: {
  //   signIn: "/api/auth/login",
  // },
});
