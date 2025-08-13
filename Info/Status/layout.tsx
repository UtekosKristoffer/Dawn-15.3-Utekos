//src/app/layout.tsx

// src/app/layout.tsx
import localFont from "next/font/local";
import "../styles/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import Providers from "@/Components/ServerComponents/Providers";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import CartDrawer from "@/Components/Cart/CartDrawer";
import getQueryClient from "@/Lib/Clients/getQueryClient";

import "../styles/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = localFont({
  src: "../assets/fonts/Inter-VariableFont_opsz,wght.ttf",
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://utekos.no"),
  title: {
    default: "Utekos - Premium Friluftsklær",
    template: "%s | Utekos",
  },
  description:
    "Utekos tilbyr premium friluftsklær for alle eventyr. Bygget med Next.js og Shopify for optimal ytelse.",
  keywords: ["friluftsliv", "utekos", "friluftsklær", "outdoor", "premium"],
  authors: [{ name: "Utekos" }],
  creator: "Utekos",
  openGraph: {
    type: "website",
    locale: "no_NO",
    url: "<https://utekos.no>",
    siteName: "Utekos",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Utekos - Premium Friluftsklær",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utekos",
    creator: "@utekos",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

async function RootLayout({ children }: { readonly children: ReactNode }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(cartOptions);

  return (
    <html lang="no" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="//cdn.shopify.com" />
        <link
          rel="preconnect"
          href="//cdn.shopify.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.className} flex flex-col min-h-screen antialiased`}
      >
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Header />
            <CartDrawer />
            <main className="flex-grow" role="main">
              {children}
            </main>
            <Footer />
          </HydrationBoundary>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

export default RootLayout;
