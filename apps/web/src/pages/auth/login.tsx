import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";

import { getCsrfToken, signIn, getSession } from "next-auth/react";

import { inferSSRProps } from "@types/inferSSRProps";

// import { getSession } from "@acme/lib/auth";
import { prisma } from "@acme/db";

import { AuthLayout } from "@components/salient/AuthLayout";
import { Button } from "@components/salient/Button";
import { TextField } from "@components/salient/Fields";
import { LogoFull } from "@components/salient/LogoFull";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required.")
    .email({ message: "Not a valid email." }),
});

type FormValues = z.infer<typeof formSchema>;

async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });
  // const ssr = await ssrInit(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const userCount = await prisma.user.count();
  if (userCount === 0) {
    // Proceed to new onboarding to create first admin user
    return {
      redirect: {
        destination: "/auth/setup",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
      // trpcState: ssr.dehydrate(),
      // isGoogleLoginEnabled: IS_GOOGLE_LOGIN_ENABLED,
      // isSAMLLoginEnabled,
      // hostedCal,
      // samlTenantID,
      // samlProductID,
    },
  };
}

const Login = (
  props: inferSSRProps<typeof getServerSideProps>
): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
  });

  const isValid = Object.keys(errors).length < 1;

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log("data ", data);

    const res = signIn("email", {
      email: data.email,
      callbackUrl: "/app",
    });

    console.log(res);
    // TODO: handle res
  };

  return (
    <>
      <Head>
        <title>Sign In - Kontx.io</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <LogoFull className="h-10 w-auto" />
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Don’t have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </Link>{" "}
              for a free trial.
            </p>
          </div>
        </div>
        <form
          className="mt-10 grid grid-cols-1 gap-y-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Email address"
            id="email"
            type="email"
            autoComplete="email"
            {...register("email", { required: true })}
            error={errors["email"] && errors["email"].message}
          />

          <div>
            <Button
              type="submit"
              state={isValid ? "active" : "disabled"}
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Sign in <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default Login;
