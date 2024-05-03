import cn from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Footer from "../footer";
import Header from "../header";

interface Props {
  children: React.ReactNode;
  horizontalMargin?: boolean;
  transparentHeader?: boolean;
}

export default function PageContainer({
  children,
  horizontalMargin = true,
  transparentHeader,
}: Props) {
  const session = useSession();

  return (
    <div className="bg-gray-950 text-white">
      <Header
        transparent={transparentHeader}
        user={
          session.status === "authenticated" ? session.data.user : undefined
        }
        signOut={() => {
          signOut();
        }}
        signIn={() => {
          signIn("spotify");
        }}
      />
      <main
        className={cn(
          "flex min-h-screen flex-col items-center justify-between overflow-x-hidden",
          {
            "px-16": horizontalMargin,
            "mt-16": !transparentHeader,
          }
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
