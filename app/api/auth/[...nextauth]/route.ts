import { connectToDB } from "@/db/connectToDB";
import User from "@/models/user";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
// import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { v4 as uuidV4 } from "uuid";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDB();
          const loginUser = await User.findOne({
            email: credentials?.email,
          });
          console.log("loginUser:", loginUser);
          const match = await bcrypt.compare(
            String(credentials?.password),
            loginUser?.password
          );
          if (!match) return;
          return loginUser;
        } catch (error) {
          console.log(error);
        }
      },
    }),
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
    // DiscordProvider({
    //   clientId: String(process.env.DISCORD_CLIENT_ID),
    //   clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
    // }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if(account?.provider == "google"){
        try {
          await connectToDB();
          const existUser = await User.findOne({
            email: profile?.email,
            password: "google",
          });
          console.log("user", existUser);
          if (!existUser) {
            const newUser = await User.create({
              userId: uuidV4(),
              email: profile?.email,
              username: profile?.name,
              password: "google",
            });
            return true;
          } else {
            return true;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true
    },
    async jwt({ token, user }) {
      /* Step 1: update the token based on the user object */
      if (user) {
        token.userId = user.userId;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      const userData = await User.findOne({email:session?.user?.email})
      if (token && session.user) {
        session.user.userId = userData.userId || token.userId;
        session.user.username = userData.username || token.username;
        session.user.email = userData.email || token.email;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
