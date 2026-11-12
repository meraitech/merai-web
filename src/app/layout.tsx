import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "@/shared/styles/globals.css";
import { SmoothScroll } from "@/shared/components/smooth-scroll";
import { SplashScreen } from "@/shared/components/splash-screen";
import { SITE_URL, SEO_IMAGE, SEO_IMAGE_ALT } from "@/i18n/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Merai — Software, engineered to grow your business.", template: "%s | Merai" },
  description: "Custom web and mobile apps, designed and built to scale with you.",
  openGraph: {
    title: "Merai — Software, engineered to grow your business.",
    description: "Custom web and mobile apps, designed and built to scale with you.",
    url: SITE_URL,
    siteName: "Merai",
    type: "website",
    images: [{ url: SEO_IMAGE, width: 1200, height: 630, alt: SEO_IMAGE_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merai — Software, engineered to grow your business.",
    description: "Custom web and mobile apps, designed and built to scale with you.",
    images: [SEO_IMAGE],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/__merai__/logo.webp", type: "image/webp" },
    ],
    apple: [
      { url: "/__merai__/logo.webp", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-video-preview": "large",
      "max-image-preview": "standard",
    },
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: Promise<{ locale?: string }>;
}>) {
  const locale = (await params)?.locale ?? "en";
  return (
    <html lang={locale} data-theme="dark">
      <head>
        <Script id="gtm-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-neutral-950`}
      >
        <Script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-MH5M7SM7"
          strategy="afterInteractive"
        />
        <SplashScreen />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
