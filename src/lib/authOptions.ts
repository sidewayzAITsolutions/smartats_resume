// @ts-ignore
const GoogleProvider = require("next-auth/providers/google").default;
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({
      session,
      user,
    }: {
      session: Record<string, any>;
      user: Record<string, any>;
    }) {
      // custom session logic
      // @ts-ignore
      session.user.id = user.id;
      return session;
    },
  },
  // ...other options
};
export default authOptions;
