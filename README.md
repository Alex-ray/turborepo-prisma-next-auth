## About

A [Turborepo](https://turborepo.org/) monorepo application that contains:

```
.github
    └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ expo
  |   ├─ Expo SDK 46
  |   ├─ React Native using React 18
  |   ├─ Tailwind using Nativewind
  |   └─ Typesafe API calls using tRPC
  └─ web
      ├─ Next.js
      ├─ React 18
      ├─ TailwindCSS
      └─ E2E Typesafe API Server & Client
packages
 ├─ api
 |   └─ tRPC v10 router definition
 └─ db
     └─ typesafe db-calls using Prisma
```

## Showcase

![showcase](https://p327.p0.n0.cdn.getcloudapp.com/items/12uzYe2E/56edf52f-bfe5-499f-a607-f0b2163153d2.gif?v=5a4fe7a8aa2a2d1facc1f687801a1389)

## Quick Start

To get it running, follow the steps below:

### Setup dependencies

```
# Install dependencies
pnpm i

# Create `.env` file and symlink it to relevant directories
cp .env.example .env
cd ./packages/db
ln -s ../../.env .env
```

### Development

Simply run the dev command to start the db mobile and web apps.

```
pnpm dev
```

Alternatively you can run just the web or mobile apps locally by running

```
pnpm dev:web
```

or

```
pnpm dev:mobile
```

### Configuring Next Auth Email Provider

The [Next Auth email provider](https://next-auth.js.org/providers/email) is used for password less email authentication.

In order to use it you have to set up a email transporter service. This starter kit uses [sendinblue.com](https://www.sendinblue.com/) but you can use any email delivery service provider supported by [nodemailer](https://nodemailer.com/smtp/).

To get sendinblue setup go to [sendinblue.com](https://www.sendinblue.com/) and signup for a free account.

Go to the SMTP & API page in the profile dropdown in the top right, click on the SMTP tab and click on "Create a new SMTP key"
![sendinblue SMTP & API settings page](https://p327.p0.n0.cdn.getcloudapp.com/items/Z4uDRdk8/9c634247-f1e5-4208-8fb8-2f51e718fd9d.jpg?v=28dd0fc91571e5bf6ce1a600bf0d1392)

Add the login and master password to these ENV variables in your `.env` file.

```
EMAIL_SERVER_USER="example@acme.com"
EMAIL_SERVER_PASSWORD="master password"

EMAIL_FROM="example@acme.com"
```

Thats it, you should now be able to authenticate users using a password less email.

### Configure Expo `dev`-script

> **Note:** If you want to use a physical phone with Expo Go, just run `pnpm dev` and scan the QR-code.

#### Use iOS Simulator

1. Make sure you have XCode and XCommand Line Tools installed [as shown on expo docs](https://docs.expo.dev/workflow/ios-simulator/).
2. Change the `dev` script at `apps/mobile/package.json` to open the iOS simulator.

```diff
+  "dev": "expo start --ios",
```

3. Run `pnpm dev` at the project root folder.

#### For Android

1. Install Android Studio tools [as shown on expo docs](https://docs.expo.dev/workflow/android-studio-emulator/).
2. Change the `dev` script at `apps/mobile/package.json` to open the Android emulator.

```diff
+  "dev": "expo start --android",
```

3. Run `pnpm dev` at the project root folder.

## Deployment

### Next.js

#### Deploy to Vercel

Let's deploy the Next.js application to [Vercel](https://vercel.com/). If you have ever deployed a Turborepo app there, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

1. Create a new project on Vercel, select the `apps/nextjs` folder as the root directory and apply the following build settings:
   <img width="907" alt="CleanShot 2022-09-03 at 22 51 25@2x" src="https://user-images.githubusercontent.com/51714798/188287309-e6ff4cb9-827a-4e50-83ed-e0953d7752f9.png">

2. Add your `DATABASE_URL` environment variable.

3. Done! Your app should successfully deploy. Assign your domain and use that instead of `localhost` for the `url` in the Expo app so that your Expo app can communicate with your backend when you are not in development.

### Expo

Deploying your Expo application works slightly differently compared to Next.js on the web. Instead of "deploying" your app online, you need to submit production builds of your app to the app stores, like [Apple App Store](https://www.apple.com/app-store/) and [Google Play](https://play.google.com/store/apps). You can read the full [Distributing your app](https://docs.expo.dev/distribution/introduction/), including best practices, in the Expo docs.

1. Let's start by setting up [EAS Build](https://docs.expo.dev/build/introduction/), which is short for Expo Application Services. The build service helps you create builds of your app, without requiring a full native development setup. The commands below are a summary of [Creating your first build](https://docs.expo.dev/build/setup/).

   ```bash
   // Install the EAS CLI
   $ pnpm add -g eas-cli

   // Log in with your Expo account
   $ eas login

   // Configure your Expo app
   $ cd apps/expo
   $ eas build:configure
   ```

2. After the initial setup, you can create your first build. You can build for Android and iOS platforms and use different [**eas.json** build profiles](https://docs.expo.dev/build-reference/eas-json/) to create production builds or development, or test builds. Let's make a production build for iOS.

   ```
   $ eas build --platform ios --profile production
   ```

   > If you don't specify the `--profile` flag, EAS uses the `production` profile by default.

3. Now that you have your first production build, you can submit this to the stores. [EAS Submit](https://docs.expo.dev/submit/introduction/) can help you send the build to the stores.

   ```
   $ eas submit --platform ios --latest
   ```

   > You can also combine build and submit in a single command, using `eas build ... --auto-submit`.

4. Before you can get your app in the hands of your users, you'll have to provide additional information to the app stores. This includes screenshots, app information, privacy policies, etc. _While still in preview_, [EAS Metadata](https://docs.expo.dev/eas/metadata/) can help you with most of this information.

5. Once everything is approved, your users can finally enjoy your app. Let's say you spotted a small typo; you'll have to create a new build, submit it to the stores, and wait for approval before you can resolve this issue. In these cases, you can use EAS Update to quickly send a small bugfix to your users without going through this long process. Let's start by setting up EAS Update.

   The steps below summarize the [Getting started with EAS Update](https://docs.expo.dev/eas-update/getting-started/#configure-your-project) guide.

   ```bash
   // Add the `expo-updates` library to your Expo app
   $ cd apps/expo
   $ pnpm expo install expo-updates

   // Configure EAS Update
   $ eas update:configure
   ```

6. Before we can send out updates to your app, you have to create a new build and submit it to the app stores. For every change that includes native APIs, you have to rebuild the app and submit the update to the app stores. See steps 2 and 3.

7. Now that everything is ready for updates, let's create a new update for `production` builds. With the `--auto` flag, EAS Update uses your current git branch name and commit message for this update. See [How EAS Update works](https://docs.expo.dev/eas-update/how-eas-update-works/#publishing-an-update) for more information.

   ```bash
   $ cd apps/expo
   $ eas update --auto
   ```

   > Your OTA (Over The Air) updates must always follow the app store's rules. You can't change your app's primary functionality without getting app store approval. But this is a fast way to update your app for minor changes and bug fixes.

8. Done! Now that you have created your production build, submitted it to the stores, and installed EAS Update, you are ready for anything!

## References

The stack originates from [create-t3-app](https://github.com/t3-oss/create-t3-app).
