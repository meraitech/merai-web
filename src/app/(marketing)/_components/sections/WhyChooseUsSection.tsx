import HeaderSection from "@/shared/components/HeaderSection";
import { Card } from "@/shared/components/ui/Card";
import { Container } from "@/shared/components/ui/Container";
import { ContainerPadding } from "@/shared/components/ui/ContainerPadding";
import { TypographyH3 } from "@/shared/components/ui/TypographyH3";
import { TypographyP } from "@/shared/components/ui/TypographyP";

export default function WhyChooseUsSection() {
  const listContent = [
    {
      title: "Seamless CMS Launch",
      paragraph:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ratione maiores eum modi voluptates quo impedit obcaecati",
      class: "lg:col-span-3",
    },
    {
      title: "Mobile-First Design",
      paragraph:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ratione maiores eum modi voluptates quo impedit obcaecati",
      class: "lg:col-span-2",
    },
    {
      title: "Deep Research",
      paragraph:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ratione maiores eum modi voluptates quo impedit obcaecati",
      class: "lg:col-span-2",
    },
    {
      title: "Future-Ready",
      paragraph:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ratione maiores eum modi voluptates quo impedit obcaecati",
      class: "lg:col-span-3",
    },
    {
      title: "Conversion-Driven",
      paragraph:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ratione maiores eum modi voluptates quo impedit obcaecati",
      class: "lg:col-span-3",
    },
    {
      title: "Discovery First",
      paragraph:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ratione maiores eum modi voluptates quo impedit obcaecati",
      class: "lg:col-span-2",
    },
  ];
  return (
    <div className="px-4 lg:px-8">
      <ContainerPadding>
        <Container>
          <div className="flex flex-col gap-8 lg:gap-12">
            <HeaderSection
              title="Why Choose Us"
              subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Non inventore
            accusantium minus quisquam natus error! Vero dolor totam nostrum
            laborum."
            />
            {/* Content  */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-8">
              {listContent.map((item, index) => (
                <div key={index} className={`${item.class}`}>
                  <Card>
                    <div className="flex flex-col gap-4 text-center items-center relative h-90 lg:h-130">
                      {/* title  */}
                      <div className="px-4 py-8 lg:px-6 lg:py-12 flex flex-col gap-3">
                        <TypographyH3 text={item.title} />
                        <div className="max-w-md">
                          <TypographyP text={item.paragraph} />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </ContainerPadding>
    </div>
  );
}
