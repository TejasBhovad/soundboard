import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GithubProvider({
      profile(profile) {
        console.log(profile); // Log the profile object to see its structure.
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
        console.log("Google" + profile); // Log the profile object to see its structure.
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

  // Optional SQL or MongoDB database to persist users
  //   database: process.env.DATABASE_URL,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
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
