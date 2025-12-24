import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/shared/styles/globals.css";
import Navbar from "@/shared/components/layouts/Navbar";
import Footer from "@/shared/components/layouts/Footer";

const SITE_URL = "https://merai.tech";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MERAI - Studio Produk Digital Indonesia",
    template: "%s | MERAI",
  },
  description:
    "MERAI adalah studio digital Indonesia yang merancang dan mengembangkan pengalaman web imersif, aplikasi interaktif, dan antarmuka bernyawa untuk brand visioner.",
  keywords: [
    "studio digital",
    "desain web",
    "pengembangan aplikasi",
    "interaksi 3D",
    "animasi GSAP",
    "pengalaman pengguna",
    "MERAI",
    "agensi digital Indonesia",
  ],
  alternates: {
    canonical: "/", // akan diproses jadi https://merai.id/
  },
  openGraph: {
    locale: "id_ID",
    type: "website",
    url: "/",
    siteName: "MERAI",
    title: "MERAI - Studio Produk Digital Indonesia",
    description:
      "Kami menggabungkan rekayasa presisi dan intuisi desain untuk menghadirkan pengalaman digital yang bergerak dan hidup.",
    images: [
      {
        url: "/og/merai-og.png", // letakkan file di public/og/merai-og.png (1200×630)
        width: 1200,
        height: 630,
        alt: "MERAI — Studio Produk Digital Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@merai", // kalau punya
    creator: "@merai", // kalau punya
    title: "MERAI - Studio Produk Digital Indonesia",
    description:
      "Studio digital Indonesia yang menciptakan website, aplikasi, dan antarmuka yang responsif terhadap emosi manusia.",
    images: ["/og/merai-og.png"],
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
  category: "technology",
  applicationName: "MERAI",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col justify-between `}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
