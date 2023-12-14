import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { saveUser, getUserByEmail } from "@/app/queries/user";

export const options = {
  providers: [
    GithubProvider({
      profile(profile) {
        // console.log(profile); // Log the profile object to see its structure.
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
        // console.log("Google" + profile); // Log the profile object to see its structure.
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
        const dbUser = await getUserByEmail(user.email);
        if (!dbUser) {
          console.log("Creating new user");
          // create user_ID from name
          const user_id = user.name.replace(/\s/g, "_").toLowerCase();
          let image;
          if (user.role === "google-user") {
            image = user.picture;
            console.log(user);
          } else if (user.role === "github-user") {
            image = user.avatar_url;
          } else {
            image = "https://robohash.org" + user_id;
          }
          // await saveUser(
          //   user.name,
          //   user_id,
          //   user.email,
          //   image,
          //   "basic",
          //   "0000-00-10",
          //   []
          // );
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
