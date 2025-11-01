import { H1HeaderUI } from "@/components/ui/h1-header.ui";
import { H2HeaderUI } from "@/components/ui/h2-header.ui";
import Image from "next/image";

export default function Works() {
  const data = {
    vision: {
      title: "Vision",
      content:
        "Visi kami yaitu Membangun masa depan digital yang hidup, indah, dan bermakna — melalui kode yang ditulis dengan presisi dan visi yang berpikir jauh ke depan.",
    },
    mission: {
      title: "Mission",
      content: [
        "Membangun pengalaman digital orisinal melalui teknologi modern dan kode murni.",
        "Menyatukan seni desain, interaksi, dan rekayasa untuk menghadirkan pengalaman yang hidup.",
        "Mendorong transformasi digital yang cerdas, scalable, dan siap menghadapi masa depan.",
      ],
    },
  };
  return (
    <main
      id="content"
      className="min-h-screen flex flex-col items-center p-8 mt-40 gap-14"
    >
      <H1HeaderUI text="Tentang" className="w-full max-w-[1200px]" />

      <section className="w-full max-w-[1200px] flex  flex-col duration-300 gap-12">
        <div className="flex flex-col gap-6 text-center">
          <h2 className="text-muted hidden">{data.vision.title}</h2>
          <p className="text-balance text-xl md:text-2xl lg:text-3xl leading-snug duration-300">
            {data.vision.content}
          </p>
        </div>

        <div className="aspect-5/3 max-w-[1000px] mx-auto bg-muted/40  overflow-hidden">
          <Image
            src={"/img/contents/about/team.webp"}
            alt=""
            width={1280}
            height={720}
            className="w-full h-full grayscale hover:scale-105 duration-300 object-cover"
          />
        </div>

        <div className="flex flex-col gap-14 mt-8">
          <H2HeaderUI
            headerText={data.mission.title}
            p="Transform your data and expertise into agentic solutions that
                      continuously improve with human interaction."
          />
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.mission.content.map((content, index) => (
              <div
                key={index}
                className="backdrop-blur-xs border border-foreground/20 w-full aspect-8/7 md:aspect-7/8 p-10 duration-300 flex flex-col gap-10 justify-between"
              >
                <span className="uppercase text-xl font-bold tracking-widest">
                  {index + 1}
                </span>
                <p className="text-xl">{content}</p>
              </div>
            ))}
          </ul>
        </div>

        {/* <p className="">
          MERAI lahir dari semangat untuk mengangkat kualitas digital di
          Indonesia ke standar global: modern, scalable, dan imersif.
        </p> */}
      </section>

      {/* <section className="max-w-[1200px] w-full grid grid-cols-2 max-md:grid-cols-1 gap-6">
        <div className="aspect-2/1 md:col-span-2 bg-muted/40  "></div>
        <div className="aspect-4/3 bg-muted/40  "></div>
        <div className="aspect-4/3 bg-muted/40"></div>
      </section> */}
    </main>
  );
}
