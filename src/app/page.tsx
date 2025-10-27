import Image from "next/image";
import { LogoLoop } from "@/components/LogoLoop";
import { H2HeaderUI } from "@/components/ui/h2-header.ui";
import { ImageWithAlt } from "@/types/image.type";
// import { H1HeaderUI } from "@/components/ui/h1-header.ui";
// import Link from "next/link";
import dynamic from "next/dynamic";
import HeroScene from "@/components/HeroSection";
import ProjectShowcase from "@/components/ProjectShowcase";

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
      <section className="flex flex-col min-h-screen items-center justify-end relative overflow-hidden">
        <HeroScene />
        {/* <div className="px-4 mb-auto mt-auto flex flex-col gap-6">
          <H1HeaderUI
            text="Solusi web yang efektif untuk bisnis skala apa pun"
            className="uppercase text-center"
          />
          <div className="my-2 text-sm">
            <Link
              href={"/works"}
              className="border py-3 px-6 hover:bg-foreground hover:text-background duration-300"
            >
              Our Works
            </Link>
          </div>
        </div> */}

        {/* <H2HeaderUI text="Modern Technology" className="px-8" /> */}
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

      {/* <section className="bg-foreground w-full h-screen text-background py-20 flex justify-center items-center">
        <div className="max-w-[1200px] w-full px-8 flex flex-col gap-12">
          <H2HeaderUI text="Creative Agency" />
          <p className="text-xl">
            We partner with companies of all sizes to solve complex business
            challenges and define their digital strategies and objectives that
            deliver results. We help bring ideas to life and create brands,
            websites & digital products that work.
          </p>
          <Image
            src={"/img/contents/Merai_Team_01-2200x1650.jpg"}
            width={2200}
            height={1650}
            alt="image"
            className="aspect-video object-cover"
          />
        </div>
      </section> */}
      <section>
        <ProjectShowcase />
      </section>
    </main>
  );
}
