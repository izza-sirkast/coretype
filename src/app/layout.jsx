import { Poppins } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "coretype",
  description: "Typing test app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/icon/png" type="image/png" sizes="any" />
      </Head>
      {/* <body className={poppins.className}> */}
      <body>
        <div className="max-h-screen overflow-hidden">
          <NextTopLoader
            color="#126bf9"
            initialPosition={0.08}
            crawlSpeed={200}
            height={4}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
          />
          {children}
        </div>
      </body>
    </html>
  );
}
