import React from "react";
import ReactQueryProvider from "../react-query-provider/react-query-provider";

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
