import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="A clone of the reddit web app." />
        <meta name="author" content="Gideon Addo" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta
          name="keywords"
          content="NextJS, JavaScript, TypeScript, React, Tailwindcss, Firebase, Authentication, SSR, RSC"
        />
        <meta name="theme-color" content="#FFF" />
      </Head>
      <body className="bg-redditLightBlue">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
