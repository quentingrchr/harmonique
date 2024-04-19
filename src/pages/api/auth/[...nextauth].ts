import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.AUTH_SPOTIFY_ID!,
      clientSecret: process.env.AUTH_SPOTIFY_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) session.user.id = token.id;
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
});
