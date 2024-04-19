import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function AuthGuard({ children }: React.PropsWithChildren<{}>) {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  return <>{children}</>;
}
