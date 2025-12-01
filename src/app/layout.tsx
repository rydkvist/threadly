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
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
  robots: "index, follow",
  openGraph: {
    title: "Threadly",
    description: "A simple real-time messaging app with threads and DMs.",
    siteName: "Threadly",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Threadly — Messaging app",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Threadly",
    description: "A simple real-time messaging app with threads and DMs.",
    images: ["/og-image.png"],
  },
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",

  themeColor: "#ffffff",
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
