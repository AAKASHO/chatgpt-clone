import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from "@/context/ContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatGpt Clone",
  description: "Chatgpt working clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/chatgptico.png" />
      </head>
      <body className={inter.className}>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
