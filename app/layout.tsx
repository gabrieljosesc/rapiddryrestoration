import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StickyCallBar } from "@/components/StickyCallBar";
import { EmergencyForm } from "@/components/EmergencyForm";
import { GoogleTag, GoogleTagManager } from "@/components/GoogleTag";
import { JsonLd, organizationSchema } from "@/components/JsonLd";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const TITLE = `${site.name} | 24/7 Water Damage Restoration Toronto & GTA`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: TITLE, template: `%s | ${site.name}` },
  description: site.description,
  keywords: [
    "water damage restoration Toronto",
    "emergency water removal Toronto",
    "flooded basement cleanup Toronto",
    "burst pipe repair GTA",
    "sewer backup cleanup Toronto",
    "structural drying Toronto",
    "mould prevention Toronto",
    "water damage insurance claim Ontario",
    "24/7 water damage restoration GTA",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: TITLE,
    description: site.description,
    images: [{ url: "/images/hero-extraction.jpg", width: 1536, height: 1024, alt: "RapidDry technician extracting water from a flooded living room" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: site.description },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b2545",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <body className={jakarta.variable}>
        <GoogleTagManager />
        <GoogleTag />
        <JsonLd data={organizationSchema()} />
        <Navbar />
        <main id="main">{children}</main>
        <EmergencyForm variant="band" />
        <Footer />
        <StickyCallBar />
      </body>
    </html>
  );
}
