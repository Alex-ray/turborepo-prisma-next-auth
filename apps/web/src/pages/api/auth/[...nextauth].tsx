import NextAuth from "next-auth";
import nodemailer from "nodemailer";
import Handlebars from "handlebars";

import { NextAuthOptions } from "next-auth";

import { readFileSync } from "fs";

import path from "path";

// Providers
import {
  default as EmailProvider,
  SendVerificationRequestParams,
} from "next-auth/providers/email";

// Adapters
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@acme/db";

// Email sender
const transporter = nodemailer.createTransport({
  service: "SendinBlue",
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

// const sendWelcomeEmail = async ({ user }) => {
//     const { email } = user;

//     try {
//         const emailFile = readFileSync(path.join(emailsDir, 'welcome.html'), {
//             encoding: 'utf8',
//         });
//         const emailTemplate = Handlebars.compile(emailFile);
//         await transporter.sendMail({
//             from: `"✨ SupaVacation" ${process.env.EMAIL_FROM}`,
//             to: email,
//             subject: 'Welcome to SupaVacation! 🎉',
//             html: emailTemplate({
//                 base_url: process.env.NEXTAUTH_URL,
//                 support_email: 'support@themodern.dev',
//             }),
//         });
//     } catch (error) {
//         console.log(`❌ Unable to send welcome email to user (${email})`);
//     }
// };

const sendVerificationRequest = ({
  identifier,
  url,
}: SendVerificationRequestParams) => {
  const emailsDir = path.resolve(
    process.cwd(),
    "..",
    "..",
    "packages/emails",
    "templates"
  );

  const emailFile = readFileSync(path.join(emailsDir, "confirm-email.html"), {
    encoding: "utf8",
  });
  const emailTemplate = Handlebars.compile(emailFile);

  transporter.sendMail({
    from: `"Kontx.io" ${process.env.EMAIL_FROM}`,
    to: identifier,
    subject: "Your sign-in link for Kontx.io",
    html: emailTemplate({
      base_url: process.env.NEXTAUTH_URL,
      signin_url: url,
      email: identifier,
    }),
  });
};

export const AuthOptions: NextAuthOptions = {
  debug: true,
  pages: {
    signIn: "/auth/register",
    error: "/auth/register",
    newUser: "/app",
  },
  providers: [
    EmailProvider({
      maxAge: 10 * 60,
      sendVerificationRequest,
    }),
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_ID,
    //     clientSecret: process.env.GOOGLE_SECRET,
    // }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
};

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth(AuthOptions);
