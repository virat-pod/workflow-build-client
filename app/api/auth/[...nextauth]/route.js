import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/db/connectDB";
import User from "@/lib/models/user";
import clientPromise from "@/lib/db/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import EmailProvider from "next-auth/providers/email";
import { nanoid } from "nanoid";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    collections: {
      Users: "auth_users",
      Accounts: "auth_accounts",
      Sessions: "auth_sessions",
      VerificationTokens: "auth_verification_tokens",
    },
  }),

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: { scope: "read:user user:email" },
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),

    EmailProvider({
      server: {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.serverEmail,
          pass: process.env.serverPass,
        },
      },
      from: `${process.env.serverEmail} <no-reply@${process.env.NEXT_PUBLIC_BASE_URL}>`,
      maxAge: 60 * 60,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "email" && !user.emailVerified) {
        return true;
      }

      await clientPromise.then((client) => {
        const db = client.db();
        return db.collection("auth_verification_tokens").deleteMany({
          identifier: user.email,
        });
      });

      if (account?.provider === "github" || account?.provider === "google") {
        if (!user.email) return true;
        await connectDB();
        const existing = await User.findOne({ email: user.email });
        if (!existing) {
          const baseName = (user.name || user.email.split("@")[0])
            .slice(0, 16)
            .toLowerCase()
            .replaceAll(" ", "");
          await User.create({
            name: baseName,
            uID: `u_${nanoid(4)}`,
            email: user.email,
          });
        }
      }

      return true;
    },

    async session({ session, user, trigger, newSession }) {
      await connectDB();
      const currentUser = await User.findOne({ email: session.user.email });
      if (currentUser) {
        session.user.name = currentUser.name;
        session.user.uid = currentUser.uID;
        session.user.xp = currentUser.xp;
        session.user.currentBadge = currentUser.currentBadge;
        session.user.badges = currentUser.badges;
        session.user.tasksCompleted = currentUser.tasksDone;
        session.user.streak = currentUser.streak;
        session.user.image = currentUser.profilePic;
      }

      if (trigger === "update" && newSession) {
        session.user.xp = newSession.user.xp;
        session.user.tasksCompleted = newSession.user.tasksCompleted;
      }

      return session;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.image = user.image;
      }

      if (trigger === "update" && session?.image) {
        token.image = session.image;
      }

      return token;
    },
  },

  events: {
    async createUser({ user }) {
      await connectDB();
      if (!user.email) return;
      const existing = await User.findOne({ email: user.email });
      if (existing) return;
      const baseName = (user.name || user.email.split("@")[0])
        .slice(0, 16)
        .toLowerCase()
        .replaceAll(" ", "");
      await User.create({
        name: baseName,
        uID: `u_${nanoid(4)}`,
        email: user.email,
      });
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
