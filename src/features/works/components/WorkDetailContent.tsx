import Image from "next/image";

// type WorkDetailSection = {
//   id: number;
//   companyName: string;
//   date: string;
//   coverImage: string;
//   description: string;
//   stack: Array<string>;
//   overview: string;
//   detailSections: Array<{ type: string; text: string }>;
//   images: Array<string>;
// };
type WorkDetailContentProps = {
  sections: Array<{ type: string; text: string }>;
};

const WorkDetailContent = ({ sections }: WorkDetailContentProps) => {
  return (
    <div className="flex flex-col gap-4">
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
          default: {
            return null;
          }
        }
      })}
    </div>
  );
};

export default WorkDetailContent;
