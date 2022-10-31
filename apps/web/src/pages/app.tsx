import { GetServerSidePropsContext } from "next";
import Head from "next/head";

import { AuthOptions } from "@pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { trpc } from "../utils/trpc";

import { useSession } from "next-auth/react";

// Components
import {
  DashboardShell,
  DashboardHome,
  DashboardAgenda,
} from "@components/dashboard";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    AuthOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    // redirectTo: "/auth/login",
    // queryConfig: {
    //   staleTime: 60 * 1000 * 60 * 3, // 3 hours
    //   refetchInterval: 60 * 1000 * 5, // 5 minutes
    // },
  });

  const authenticatedSession = status === "authenticated" && session;
  const userEmail =
    (authenticatedSession && session.user && session.user.email) || "";

  const postQuery = trpc.post.all.useQuery();

  return (
    <>
      <Head>
        <title>Acme - Your personal project management tool</title>
        <meta
          name="description"
          content="Your personal project management tool."
        />
      </Head>
      <DashboardShell
        name={userEmail}
        columns={[
          <DashboardHome key={"home"} data={postQuery.data} />,
          <DashboardAgenda key={"dailyAgenda"} />,
        ]}
      />
    </>
  );
}
