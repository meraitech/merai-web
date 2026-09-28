import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/shared/styles/globals.css";
<<<<<<< HEAD:src/app/(marketing)/layout.tsx
import Navbar from "@/shared/components/layouts/Navbar";
import Footer from "@/shared/components/layouts/Footer";
=======
import { SmoothScroll } from "@/shared/components/smooth-scroll";
>>>>>>> develop:src/app/layout.tsx

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
<<<<<<< HEAD:src/app/(marketing)/layout.tsx
  category: "technology",
  applicationName: "MERAI",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
=======
>>>>>>> develop:src/app/layout.tsx
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
<<<<<<< HEAD:src/app/(marketing)/layout.tsx
    <html lang="id" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col justify-between `}
      >
        <Navbar />
        {children}
        <Footer />
=======
    <html lang="en" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-neutral-950`}
      >
        <SmoothScroll>{children}</SmoothScroll>
>>>>>>> develop:src/app/layout.tsx
      </body>
    </html>
  );
}
