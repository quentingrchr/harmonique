import Button from "@/components/shared/button";
import PageContainer from "@/components/shared/page-container/page-container";
import { signIn, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import MainTitle from "./main-title";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const session = useSession();

  return (
    <PageContainer horizontalMargin>
      <div className="min-h-screen flex flex-col items-center justify-center min-w-full relative">
        <div className="w-[330px] h-[225px] bg-brand rounded-md blur-[190px] left-0 absolute top-0 animate-float"></div>
        <div className="w-[330px] h-[225px] bg-brand rounded-md blur-[190px] right-0 absolute top-1/2 animate-floatReverse"></div>
        {session.status === "loading" && <p>Loading...</p>}
        {/* {session.status === "unauthenticated" && (
          <button onClick={() => signIn("spotify")}>Login to spotify</button>
        )} */}
        <div className="flex flex-col gap-12 max-w-[650px] text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <MainTitle />
            <p className="text-lg font-light">
              Search and order tracks by music keys and BPM in any{" "}
              <strong>Spotify</strong> playlist to create seamless mashups and
              harmonious blends.
            </p>
          </div>
          <Button
            size="lg"
            className="m-auto"
            onClick={() => signIn("spotify")}
          >
            Sign in with Spotify
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
