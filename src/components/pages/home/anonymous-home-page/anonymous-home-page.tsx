import PageContainer from "@/components/shared/page-container/page-container";
import { signIn, signOut, useSession } from "next-auth/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const session = useSession();

  return (
    <PageContainer horizontalMargin>
      {session.status === "loading" && <p>Loading...</p>}
      {session.status === "unauthenticated" && (
        <button onClick={() => signIn("spotify")}>Login to spotify</button>
      )}
      {session.status === "authenticated" && (
        <div className="flex flex-col gap-4">
          <p>Logged in </p>
          <button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            Sign out
          </button>
        </div>
      )}
    </PageContainer>
  );
}
