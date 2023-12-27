import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { saveUser, getUserByEmail } from "@/app/queries/user";

export const options = {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    GithubProvider({
      profile(profile) {
        let userRole = "github-user";
        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        let userRole = "google-user";
        return {
          ...profile,
          role: userRole,
          id: profile.sub,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await getUserByEmail(user.email);
        if (!dbUser) {
          console.log("Creating new user");
          const user_id = user.name.replace(/\s/g, "_").toLowerCase();
          let image;
          if (user.role === "google-user") {
            image = user.picture;
          } else if (user.role === "github-user") {
            image = user.avatar_url;
          } else {
            image = "https://robohash.org" + user_id;
          }
          await saveUser(user.name, user_id, image, user.email, "basic");
        }
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};
