import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "coretype",
  description: "Typing test app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="max-h-screen overflow-hidden">
        {children}
      </div>
      </body>
    </html>
  );
}
