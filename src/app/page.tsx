import type { Metadata } from "next";
import { LogoLoop } from "@/app/_components/LogoLoop";
import { ImageWithAlt } from "@/types/image.type";
import HeroScene from "@/app/_components/HeroSection";
import QuotesDepth from "@/components/QuotesDepth";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollSwapSection from "@/app/_components/ScrollSwap";
import WorksShowcase from "@/components/WorksShowcase";
import { H2HeaderUI } from "@/components/ui/h2-header.ui";
import Image from "next/image";

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

  const services = [
    "Web Development",
    "SEO",
    "API Integration",
    "System Design",
    "System Design",
    "AI Integration",
    "Blockchain Integration",
  ];

  return (
    <main id="content">
      <SmoothScroll />
      {/* Hero Section  */}
      <section
        id="hero"
        className="flex flex-col min-h-screen items-center justify-end relative overflow-hidden px-(--p-container-sm) sm:px-0"
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

      <section className="px-(--p-container) pb-40 pt-80 max-w-[1200px] mx-auto grid gap-14">
        <H2HeaderUI
          headerText="Untuk yang Berani Berbeda"
          p="MERAI hadir untuk mereka yang ingin tampil beda — membangun kesan eksklusif dengan teknologi, desain, dan kode murni."
        />

        <div className="flex max-md:flex-col gap-8">
          <div className="backdrop-blur-xs border border-foreground/20 w-full  aspect-8/7 md:aspect-7/8 duration-300 relative overflow-hidden flex">
            <div className="p-8 flex flex-col justify-between gap-8 z-10 pointer-events-none">
              <span className="uppercase text-sm tracking-widest font-epicpro">
                Small Business (UMKM)
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl md:text-2xl">
                  Naik Kelas, Tanpa Kehilangan Identitas
                </h3>
                <p className="max-md:text-sm">
                  Kami bantu UMKM tampil eksklusif dan profesional dengan
                  website yang cepat, elegan, dan dibangun dari kode asli.
                </p>
              </div>
            </div>

            <div className="h-full w-full absolute right-0 bottom-0 z-0">
              <Image
                src={"/img/contents/landing/small-business.webp"}
                alt=""
                width={1064}
                height={1080}
                draggable={false}
                className="w-full h-full object-cover opacity-50 hover:scale-105 duration-300"
              />
            </div>
          </div>
          <div className="backdrop-blur-xs border border-foreground/20 w-full  aspect-8/7 md:aspect-7/8 duration-300 relative overflow-hidden flex">
            <div className="p-8 flex flex-col justify-between gap-8 z-10 pointer-events-none">
              <span className="uppercase text-sm tracking-widest font-epicpro">
                ENTERPRISE
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl md:text-2xl">
                  Modernisasi yang Berjiwa Eksklusif
                </h3>
                <p className="max-md:text-sm max-md">
                  Untuk perusahaan besar yang ingin tampil lebih dinamis,
                  inovatif, dan berkelas — melalui pengalaman digital yang
                  benar-benar hidup.
                </p>
              </div>
            </div>

            <div className="h-full w-full absolute right-0 bottom-0 z-0">
              <Image
                src={"/img/contents/landing/enterprise.webp"}
                alt=""
                width={1064}
                height={1080}
                draggable={false}
                className="w-full h-full object-cover opacity-50 hover:scale-105 duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="what-we-build"
        className="px-(--p-container) pt-40 max-w-[1200px] mx-auto grid gap-14"
      >
        <H2HeaderUI
          headerText="Dirancang untuk Hidup"
          p="Kami membangun pengalaman digital dengan kode murni, desain hidup, dan teknologi masa depan"
        />
        <div className="grid md:grid-cols-2 gap-8">
          <ul className="grid gap-6 max-md:gap-4 max-md:order-2">
            {services.map((service, index) => (
              <li
                key={index}
                className="text-xl p-4 my-auto border border-foreground/20 "
              >
                {service}
              </li>
            ))}
          </ul>

          <div className="backdrop-blur-xs border border-foreground/20 w-full h-full duration-300 aspect-3/4 max-md:aspect-video overflow-hidden">
            <Image
              src={"/img/contents/landing/merai_customer.webp"}
              alt=""
              width={1064}
              height={1080}
              draggable={false}
              className="w-full h-full object-cover object-top hover:scale-105  duration-300 opacity-70"
            />
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
