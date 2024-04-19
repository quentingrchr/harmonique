import { DefaultSession } from "next-auth";
import "next-auth/jwt";
import "next-auth/types";

import "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    toto: string;
    user: {
      id: string;
      /** The user's postal address. */
      address: string;
    } & DefaultSession["user"];
    accessToken: string | undefined;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string;
    accessToken?: string;
  }
}
