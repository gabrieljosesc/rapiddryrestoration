import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StickyCallBar } from "@/components/StickyCallBar";
import { EmergencyForm } from "@/components/EmergencyForm";
import { GoogleTag, GoogleTagManager } from "@/components/GoogleTag";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/JsonLd";
import { areas, areaUrl } from "@/lib/areas";
import { services } from "@/lib/services";

// Variable font: one file covers every weight, instead of five separate files.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
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
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // Search Console / Bing Webmaster ownership tags. Set the env vars on Vercel
  // and redeploy; nothing is rendered while they are empty.
  verification: {
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : {}),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } }
      : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#0b2545",
  width: "device-width",
  initialScale: 1,
};

// Only the labels and links the menu needs are sent to the browser, not the
// full service and area page content.
const serviceLinks = services.map((s) => ({
  href: `/services/${s.slug}`,
  label: s.navLabel,
  note: s.cardNote?.replace(/[()]/g, ""),
}));
const areaLinks = areas.map((a) => ({ href: areaUrl(a.slug), label: a.name }));

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <body className={jakarta.variable}>
        <GoogleTagManager />
        <GoogleTag />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Navbar serviceLinks={serviceLinks} areaLinks={areaLinks} />
        <main id="main">{children}</main>
        <EmergencyForm variant="band" />
        <Footer />
        <StickyCallBar />
      </body>
    </html>
  );
}
