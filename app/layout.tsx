import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { pageMetadata, siteDescription, siteName, siteUrl } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  ...pageMetadata("Product Photography & Video UK", siteDescription, "/"),
  title: {
    default: "Product Photography & Video UK | Epitome Creatives",
    template: "%s | Epitome Creatives",
  },
  // Each public route sets its own canonical; private routes must not inherit one.
  alternates: undefined,
  metadataBase: new URL(siteUrl),
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  icons: { icon: "/Logo.png", shortcut: "/Logo.png", apple: "/Logo.png" },
  category: "photography",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body className={`${inter.variable} min-h-screen`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
