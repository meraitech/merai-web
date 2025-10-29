import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { H1HeaderUI } from "@/components/ui/h1-header.ui";

import { workProjects } from "./projects";

export const metadata: Metadata = {
  title: "Karya",
  description:
    "Kumpulan proyek MERAI yang menampilkan perpaduan strategi, visual, dan teknologi untuk brand terdepan di Indonesia.",
  openGraph: {
    title: "Karya MERAI",
    description:
      "Lihat bagaimana MERAI membantu brand bertransformasi melalui pengalaman digital yang bergerak dan bernyawa.",
    url: "/works",
    type: "website",
  },
  twitter: {
    title: "Karya MERAI",
    description:
      "Rangkaian proyek digital MERAI yang menggabungkan rekayasa presisi dan estetika yang ekspresif.",
  },
};

export default function Works() {
  return (
    <main
      id="content"
      className="flex w-full flex-col gap-8 p-8 mt-40 min-h-screen"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12">
        <H1HeaderUI text="Karya" className="w-full" />

        <section className="grid gap-8 duration-300 md:grid-cols-2 lg:grid-cols-3">
          {workProjects.map((item) => (
            <Link
              key={item.id}
              href={`/works/project/${item.id}`}
              className="group flex flex-col gap-4"
              // View Transition Name untuk shared element animation
              style={{
                // @ts-ignore - View Transitions API
                viewTransitionName: `work-card-${item.id}`,
              }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={`${item.companyName} Project`}
                  width={1920}
                  height={1080}
                  priority={item.id <= 2}
                  className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{
                    // @ts-ignore - View Transitions API
                    viewTransitionName: `work-image-${item.id}`,
                  }}
                />

                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="flex flex-col gap-3">
                <h3
                  className="text-xl font-bold transition-colors duration-300 group-hover:text-white/80 md:text-2xl order-2"
                  style={{
                    viewTransitionName: `work-title-${item.id}`,
                  }}
                >
                  {item.companyName}
                </h3>

                <div className="flex items-start justify-between gap-3 text-sm text-muted">
                  <span className="text-white/60 w-1/3">{item.date}</span>
                  <div className="flex flex-wrap justify-end gap-2 w-2/3">
                    {item.stack.map((stack, index) => (
                      <span
                        key={index}
                        className="border border-white/10 px-2 py-0.5 text-xs text-white/50 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/70"
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
