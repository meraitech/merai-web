import { H1HeaderUI } from "@/components/ui/h1-header.ui";

export default function Works() {
  const data = {
    vision: {
      title: "Vision",
      content:
        "Membangun masa depan digital yang hidup, indah, dan bermakna — melalui kode yang ditulis dengan presisi dan visi yang berpikir jauh ke depan.",
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
      className="mt-20 p-8 min-h-screen flex flex-col items-center gap-10"
    >
      <H1HeaderUI text="About Us" className="w-full max-w-[1200px]" />

      <section className="w-full max-w-[1200px] flex max-md:flex-col duration-300 gap-8">
        <div className="md:w-1/3 lg:w-1/2 duration-300"></div>
        <div className="md:w-2/3 lg:w-1/2 duration-300 grid gap-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-muted">{data.vision.title}</h2>
            <p className="text-balance">{data.vision.content}</p>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-muted">{data.mission.title}</h2>
            <ul className="grid gap-4">
              {data.mission.content.map((content, index) => (
                <li key={index}>{content}</li>
              ))}
            </ul>
          </div>

          <p className="">
            MERAI lahir dari semangat untuk mengangkat kualitas digital di
            Indonesia ke standar global: modern, scalable, dan imersif.
          </p>

          <div className="aspect-video bg-muted/40  "></div>
        </div>
      </section>

      {/* <section className="max-w-[1200px] w-full grid grid-cols-2 max-md:grid-cols-1 gap-6">
        <div className="aspect-2/1 md:col-span-2 bg-muted/40  "></div>
        <div className="aspect-4/3 bg-muted/40  "></div>
        <div className="aspect-4/3 bg-muted/40"></div>
      </section> */}
    </main>
  );
}
