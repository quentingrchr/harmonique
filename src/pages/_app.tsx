import AppProviders from "@/components/shared/app-providers";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const { session } = pageProps;

  return (
    <SessionProvider session={session}>
      <AppProviders>
        <Component {...pageProps} />
      </AppProviders>
    </SessionProvider>
  );
}
