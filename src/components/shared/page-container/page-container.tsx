import cn from "classnames";
import { useSession, signOut } from "next-auth/react";
import React from "react";
import Header from "../header";

interface Props {
  children: React.ReactNode;
  horizontalMargin?: boolean;
}

export default function PageContainer({
  children,
  horizontalMargin = true,
}: Props) {
  const session = useSession();

  return (
    <div>
      <Header
        user={
          session.status === "authenticated" ? session.data.user : undefined
        }
        signOut={() => {
          signOut();
        }}
      />
      <main
        className={cn(
          "flex min-h-screen flex-col items-center justify-between overflow-x-hidden mt-16",
          {
            "px-16": horizontalMargin,
          }
        )}
      >
        {children}
      </main>
    </div>
  );
}
