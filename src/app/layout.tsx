import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LiquidEther from "@/components/LiquidEther";
import GridPlus from "@/components/GridPlus";
import Link from "next/link";
import Image from "next/image";
import { ViewTransition } from "react";
import Navbar from "./_components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  openGraph: {
    locale: "id_ID",
    type: "website",
    title: "MERAI - Studio Produk Digital Indonesia",
    description:
      "Kami menggabungkan rekayasa presisi dan intuisi desain untuk menghadirkan pengalaman digital yang bergerak dan hidup.",
    url: "/",
    siteName: "MERAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "MERAI - Studio Produk Digital Indonesia",
    description:
      "Studio digital Indonesia yang menciptakan website, aplikasi, dan antarmuka yang responsif terhadap emosi manusia.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransition>
      <html lang="id">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          {children}

          <footer className="mx-auto bg-linear-to-t from-background w-full text-center py-10 opacity-70">
            © {new Date().getFullYear()} MERAI. Seluruh hak cipta dilindungi.
          </footer>

          {/* Background  */}
          <div
            className="fixed inset-0 -z-10 pointer-events-none opacity-30 "
            aria-hidden="true"
            role="presentation"
          >
            <GridPlus />
            <LiquidEther
              colors={["#fff", "#fff", "#fff"]}
              mouseForce={10}
              cursorSize={100}
              isViscous={false}
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.5}
              isBounce={true}
              autoDemo={false}
              autoSpeed={0.2}
              autoIntensity={1.2}
              takeoverDuration={0.25}
              autoResumeDelay={2000}
              autoRampDuration={0.6}
            />
          </div>
        </body>
      </html>
    </ViewTransition>
  );
}
