import { LogoLoop } from "@/components/LogoLoop";
import { ImageWithAlt } from "@/types/image.type";
import HeroScene from "@/components/HeroSection";
import QuotesDepth from "@/components/QuotesDepth";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollSwapSection from "@/components/ScrollSwap";
import WorksShowcase from "@/components/WorksShowcase";

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

      <section id="manifesto" className="relative">
        <QuotesDepth />
        {/* <div style={{ height: "1000px" }} aria-hidden="true"></div> */}
      </section>

      <ScrollSwapSection />

      <WorksShowcase />
    </main>
  );
}
