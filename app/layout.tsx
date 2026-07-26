import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Json, localBusinessLd, SITE } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "JUNK FREE — Junk Removal & Waste Management in Greater Vancouver", template: "%s | JUNK FREE" },
  description:
    "Professional junk removal, demolition, and waste management across Greater Vancouver. Fast, eco-friendly, same/next-day service for homes and businesses.",
};

export const viewport: Viewport = { themeColor: SITE.theme };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <body>
        <Json data={localBusinessLd()} />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
