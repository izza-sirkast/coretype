import { Poppins } from "next/font/google";
import "./globals.css";
import Head from "next/head";

// const poppins = Poppins({
//   subsets: ["latin"],
//   variable: "--font-poppins",
// });

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
        <div className="max-h-screen overflow-hidden">{children}</div>
      </body>
    </html>
  );
}
