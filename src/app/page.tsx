import { LogoLoop } from "@/components/LogoLoop";
import { ImageWithAlt } from "@/types/image.type";
import HeroScene from "@/components/HeroSection";
import QuotesDepth from "@/components/QuotesDepth";
import StackSheet from "@/components/StackSheet";

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
      {/* Hero Section  */}
      <section
        id="hero"
        className="flex flex-col min-h-screen items-center justify-end relative overflow-hidden"
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

      {/* StackSheet */}
      <StackSheet backgroundClassName="bg-white">
        <section id="the-core">
          <h2>The Core</h2>
          <p>Fondasi sistem kami...</p>
        </section>
        <section id="future-in-motion">
          <h2>Future in Motion</h2>
          <p>AI-native workflow...</p>
        </section>
      </StackSheet>

      <section id="after-stack" className="h-screen">
        {/* isi konten lanjut */}
        <div className="">sad</div>
      </section>
    </main>
  );
}
