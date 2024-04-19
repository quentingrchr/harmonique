import cn from "classnames";
import { signOut, useSession } from "next-auth/react";
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
  const hasHeader = session.status === "authenticated";

  return (
    <div>
      {hasHeader && (
        <Header
          user={session.data.user}
          signOut={() => {
            signOut();
          }}
        />
      )}
      <main
        className={cn(
          "flex min-h-screen flex-col items-center justify-between overflow-x-hidden",
          {
            "mt-16": hasHeader,
            "px-16": horizontalMargin,
          }
        )}
      >
        {children}
      </main>
    </div>
  );
}
