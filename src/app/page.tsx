import type { Metadata } from "next";
import { LogoLoop } from "@/components/LogoLoop";
import { ImageWithAlt } from "@/types/image.type";
import HeroScene from "@/components/HeroSection";
import QuotesDepth from "@/components/QuotesDepth";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollSwapSection from "@/components/ScrollSwap";
import WorksShowcase from "@/components/WorksShowcase";
import { H2HeaderUI } from "@/components/ui/h2-header.ui";

export const metadata: Metadata = {
  title: "Beranda",
  description:
    "MERAI adalah studio digital Indonesia yang memadukan teknologi mutakhir dan desain puitis untuk menciptakan situs web, aplikasi, dan pengalaman interaktif yang hidup.",
  openGraph: {
    title: "MERAI - Studio Digital Indonesia",
    description:
      "Temukan bagaimana MERAI membangun pengalaman digital yang responsif terhadap emosi manusia melalui kombinasi rekayasa dan seni.",
    url: "/",
    type: "website",
  },
  twitter: {
    title: "MERAI - Studio Digital Indonesia",
    description:
      "Kami menciptakan pengalaman digital yang memikat dan berdampak bagi brand ambisius di Indonesia.",
  },
};

export default function Home() {
  const listLogo: ImageWithAlt[] = [
    {
      src: "/img/company/stacks/gsap.webp",
      alt: "next logo",
    },
    {
      src: "/img/company/stacks/nodejs.webp",
      alt: "next logo",
    },
    {
      src: "/img/company/stacks/shadcn.webp",
      alt: "next logo",
    },
    {
      src: "/img/company/stacks/tailwindcss.webp",
      alt: "next logo",
    },
    {
      src: "/img/company/stacks/three.webp",
      alt: "next logo",
    },
  ];

  return (
    <main id="content">
      <SmoothScroll />
      {/* Hero Section  */}
      <section
        id="hero"
        className="flex flex-col min-h-screen items-center justify-end relative overflow-hidden px-4 sm:px-0"
      >
        <HeroScene />
        <LogoLoop
          logos={listLogo}
          speed={100} // kecepatan dasar (px/detik)
          direction="left"
          gap={0}
          logoHeight={200}
          pauseOnHover
          fadeOut
          fadeOutColor="transparent"
          scaleOnHover={true}
          scrollGain={0.6} // pengaruh scroll (coba 0.2–0.6)
          scrollSmoothingTau={0}
        />
      </section>

      <section className="px-8 py-40 max-w-[1200px] mx-auto grid gap-14">
        <H2HeaderUI
          headerText="Software Solutions"
          p="Transform your data and expertise into agentic solutions that
            continuously improve with human interaction."
        />

        <div className="grid md:grid-cols-2 gap-8">
          <div className="backdrop-blur-xs border border-foreground/20 w-full aspect-8/7 md:aspect-7/8 p-10 duration-300 flex flex-col justify-between gap-10">
            <span className="uppercase text-sm tracking-widest">
              Small Business
            </span>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl">
                Agentic Solutions for Defense and Intelligence
              </h3>
              <p className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
                ipsum dolor sit amet.
              </p>
            </div>
          </div>
          <div className="backdrop-blur-xs border border-foreground/20 w-full aspect-8/7 md:aspect-7/8 p-10 duration-300 flex flex-col justify-between gap-10">
            <span className="uppercase text-sm tracking-widest">
              Small Business
            </span>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl">
                Agentic Solutions for Defense and Intelligence
              </h3>
              <p className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
                ipsum dolor sit amet.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="manifesto" className="relative">
        <QuotesDepth />
      </section>

      <ScrollSwapSection />

      <WorksShowcase />
    </main>
  );
}
