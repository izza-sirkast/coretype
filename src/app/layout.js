import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "coretype",
  description: "Typing test app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          href="/icon/png"
          type="image/png"
          sizes="any"
        />
      </Head>
      <body className={inter.className}>
      <div className="max-h-screen overflow-hidden">
        {children}
      </div>
      </body>
    </html>
  );
}
