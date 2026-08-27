import type { Metadata, Viewport } from "next";
import { Archivo, Inter, Noto_Sans_Devanagari, Space_Grotesk } from "next/font/google";
import { SiteShell } from "@/components/site/site-shell";
import { ThemeProvider } from "@/components/site/theme-provider";
import { site } from "@/config/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Companion face so नेपाली always reads well, a Deliberate pairing,
// never an afterthought. Preloads on demand via unicode-range.
const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Grooma | Barbershop booking & shop management software",
    template: "%s | Grooma",
  },
  description:
    "Grooma is barbershop booking software that computes real availability, prevents double-bookings, and keeps your own shop the brand. No account for your customers. Works in English and नेपाली.",
  keywords: [
    "barbershop booking software",
    "barbershop appointment app",
    "barber booking system Nepal",
    "salon booking software",
    "no double booking software",
    "Nepali barbershop app",
    "barbershop management",
    "guest booking no account",
    "Grooma",
  ],
  applicationName: "Grooma",
  creator: site.creator.name,
  authors: [{ name: site.creator.name, url: site.creator.portfolio }],
  category: "Business & Productivity",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Grooma",
    locale: "en_US",
    alternateLocale: ["ne_NP"],
    url: site.url,
    title: "Grooma | Barbershop booking & shop management software",
    description:
      "Barbershop booking that computes availability, never promises it. Your shop stays the brand. Guest booking, no accounts.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@arundada9000",
    title: "Grooma | Barbershop booking & shop management software",
    description:
      "Barbershop booking that computes real availability. Your shop stays the brand.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0a09",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full antialiased ${archivo.variable} ${space.variable} ${inter.variable} ${devanagari.variable}`}
    >
      <head>
        {/* Apply the saved theme/scheme before first paint to avoid any flash.
            Mirrors the storage key used by the ThemeProvider. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k="grooma:theme";var s=localStorage.getItem(k);var t="copper",m="dark";if(s){var c=JSON.parse(s);if(c&&c.theme)t=c.theme;if(c&&(c.scheme==="light"||c.scheme==="dark"))m=c.scheme}var d=document.documentElement;d.dataset.theme=t;d.dataset.scheme=m;d.style.colorScheme=m}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-ink text-paper">
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
