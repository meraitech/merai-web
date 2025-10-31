import Image from "next/image";
import type { WorkDetailSection } from "@/app/works/projects";

type WorkDetailContentProps = {
  sections: WorkDetailSection[];
};

const WorkDetailContent = ({ sections }: WorkDetailContentProps) => {
  return (
    <div className="flex flex-col gap-6">
      {sections.map((section, index) => {
        switch (section.type) {
          case "heading": {
            return (
              <h2
                key={`heading-${index}`}
                className="text-xl font-semibold tracking-tight text-white md:text-2xl"
              >
                {section.text}
              </h2>
            );
          }
          case "paragraph": {
            return (
              <p
                key={`paragraph-${index}`}
                className="text-base leading-relaxed text-muted"
              >
                {section.text}
              </p>
            );
          }
          case "list": {
            return (
              <div
                key={`list-${index}`}
                className="border border-white/10 bg-white/5 p-4 text-sm text-muted"
              >
                {section.title ? (
                  <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/60">
                    {section.title}
                  </p>
                ) : null}
                <ul className="flex list-disc flex-col gap-1 pl-5">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          }
          case "highlight": {
            return (
              <div
                key={`highlight-${index}`}
                className=" border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-100"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">
                  {section.label}
                </p>
                <p className="mt-2 text-base font-semibold text-white">
                  {section.value}
                </p>
              </div>
            );
          }
          case "image": {
            return (
              <div key={`image-${index}`} className="overflow-hidden ">
                <Image
                  src={section.src}
                  alt={section.alt}
                  width={1920}
                  height={1080}
                  className="h-auto w-full border border-white/5 object-cover"
                />
              </div>
            );
          }
          default: {
            return null;
          }
        }
      })}
    </div>
  );
};

export default WorkDetailContent;
