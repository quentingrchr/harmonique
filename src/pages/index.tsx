import HomeAuth from "@/components/pages/home/auth-home-page";
import Home from "@/components/pages/home/home-page";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const session = useSession();

  if (session.status === "authenticated") {
    return <HomeAuth />;
  } else if (session.status === "unauthenticated") {
    return <Home />;
  }
}
