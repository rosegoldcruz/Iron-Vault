import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  IBM_Plex_Mono,
  Sora,
} from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display-ui",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sans = Sora({
  variable: "--font-sans-ui",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Iron Vault Token",
  description:
    "Iron Vault Token (IVT) presale — the utility and royalty layer of the Common Wealth Ventures ecosystem. 250,000 tokens per package. Exchange launch November 1, 2026.",
  applicationName: "Iron Vault Token",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#060606",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
