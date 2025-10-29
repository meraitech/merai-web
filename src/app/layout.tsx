import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LiquidEther from "@/components/LiquidEther";
import GridPlus from "@/components/GridPlus";
import Link from "next/link";
import Image from "next/image";
import { ViewTransition } from "react";

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
          <header className="fixed inset-x-0 top-0 z-40 text-sm">
            <div className="flex w-full items-center justify-between py-4 px-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2"
                aria-label="Beranda MERAI"
              >
                <Image
                  src={"/__merai__/logo.webp"}
                  alt="Logo Merai"
                  width={45}
                  height={45}
                  draggable={false}
                />
              </Link>

              <nav aria-label="Navigasi utama" className="hidden md:block">
                <ul className="flex items-center gap-6">
                  <li>
                    <Link
                      href="/works"
                      className="inline-flex items-center text-muted hover:text-white focus:scale-105 focus:text-white duration-300"
                    >
                      Karya
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="inline-flex items-center text-muted hover:text-white focus:scale-105 focus:text-white duration-300"
                    >
                      Tentang
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center">
                <Link
                  href="/contact"
                  className="border border-foreground/20 px-4 py-2 hover:opacity-50 duration-300 backdrop-blur-xs"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </header>

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
