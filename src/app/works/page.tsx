import { H1HeaderUI } from "@/components/ui/h1-header.ui";
import Image from "next/image";

export default function Works() {
  const data = [
    {
      companyName: "Starbucks Cafe",
      date: "2025 10.28",
      imageUrl: "/img/contents/project-company.webp",
      description:
        "A kinetic storefront that adapts to customer intent, blending motion design with headless commerce.",
      stack: ["NextJs 16", "Tailwindcss"],
    },
    {
      companyName: "Flux OS",
      date: "2025 10.28",
      imageUrl: "/img/contents/project-company.webp",
      description:
        "Live data orchestration with volumetric UI depth, crafted for ultra-fast decision loops.",
      stack: ["NextJs 16", "Tailwindcss", "GSAP", "Shadcn", "NestJs"],
    },
    {
      companyName: "Nimbus Robotics",
      date: "2025 10.28",
      imageUrl: "/img/contents/project-company.webp",
      description:
        "Control interfaces engineered for precision robotics - calibrated for clarity in high-pressure teams.",
      stack: ["NextJs 16", "Tailwindcss"],
    },
    {
      companyName: "Solstice Studio",
      date: "2025 10.28",
      imageUrl: "/img/contents/project-company.webp",
      description:
        "Interactive narrative that channels sound, light, and motion to express a bold creative identity.",
      stack: ["NextJs 16", "Tailwindcss"],
    },
    {
      companyName: "Kairo AI",
      date: "2025 10.28",
      imageUrl: "/img/contents/project-company.webp",
      description:
        "Sensor-fed interface visualizing anomaly detection with confidence shading and adaptive focus.",
      stack: ["NextJs 16", "Tailwindcss"],
    },
  ];
  return (
    <main
      id="content"
      className="mt-20 p-8 min-h-screen flex flex-col items-center gap-8"
    >
      <H1HeaderUI text="Works" className="w-full max-w-[1200px]" />

      <div className=""></div>

      <section className="w-full max-w-[1200px] grid md:grid-cols-2 gap-8 duration-300">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-4">
            <Image
              src={"/"}
              // src={item.imageUrl}
              alt={item.companyName + " Project"}
              width={1920}
              height={1080}
              className="w-full aspect-video object-cover bg-white"
            />

            <div className="grid gap-4">
              <h3 className="font-bold text-xl md:text-2xl order-2">
                {item.companyName}
              </h3>
              <div className="flex justify-between ">
                <span className="w-1/3 max-md:text-sm">{item.date}</span>
                <div className="w-2/3 flex flex-wrap justify-end gap-2 text-muted max-md:text-sm">
                  {"["}
                  {item.stack.map((stack, idx) => (
                    <span key={idx}>{stack}</span>
                  ))}
                  {"]"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
