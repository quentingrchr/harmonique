import Home from "@/components/pages/home/anonymous-home-page";
import HomeAuth from "@/components/pages/home/auth-home-page";
import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  const session = useSession();

  if (session.status === "authenticated") {
    return <HomeAuth />;
  } else {
    return <Home />;
  }
}
