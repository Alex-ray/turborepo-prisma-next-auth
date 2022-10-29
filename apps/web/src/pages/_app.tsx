// src/pages/_app.tsx
import "../styles/fonts.css";
import "../styles/globals.css";

import { Session } from "next-auth";
import { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session;
}>) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
