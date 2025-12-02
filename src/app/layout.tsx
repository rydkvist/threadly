import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Threadly",
    template: "%s — Threadly",
  },
  description: "A simple, real-time messaging app built with Next.js and tRPC.",
  robots: "index, follow",
  openGraph: {
    title: "Threadly",
    description: "A simple real-time messaging app with threads and DMs.",
    siteName: "Threadly",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-gray-50">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
