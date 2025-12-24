import HeaderSection from "@/shared/components/HeaderSection";
import { Card } from "@/shared/components/ui/Card";
import { Container } from "@/shared/components/ui/Container";
import { ContainerPadding } from "@/shared/components/ui/ContainerPadding";
import { TypographyH3 } from "@/shared/components/ui/TypographyH3";

export const WorkSection = () => {
  const listWork = [
    {
      title: "Blackcore",
      list: ["Web Development", "UI/UX Design"],
    },
    {
      title: "Blackcore",
      list: ["Web Development", "UI/UX Design"],
    },
    {
      title: "Blackcore",
      list: ["Web Development", "UI/UX Design"],
    },
  ];
  return (
    <div className="px-4 lg:px-8">
      <ContainerPadding>
        <Container>
          <div className="flex flex-col gap-8 lg:gap-12">
            <HeaderSection
              title="Works"
              subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Non inventore
            accusantium minus quisquam natus error! Vero dolor totam nostrum
            laborum."
            />

            {/* Content  */}
            <ul className="flex gap-4 lg:gap-8">
              {listWork.map((item, index) => (
                <div key={index} className="aspect-square  h-90 lg:h-130">
                  <Card>
                    <div className="flex flex-col justify-end h-full p-4 lg:p-8 gap-2 lg:gap-4">
                      <TypographyH3 text={item.title} />
                      <div className="uppercase text-xs flex text-background gap-1 font-haffer-mono-regular">
                        <p className="bg-muted py-1 px-2 rounded-full">
                          mermbership
                        </p>
                        <p className="bg-muted py-1 px-2 rounded-sm">
                          part of the
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </ul>
          </div>
        </Container>
      </ContainerPadding>
    </div>
  );
};
