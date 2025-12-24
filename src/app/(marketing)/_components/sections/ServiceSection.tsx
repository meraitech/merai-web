/* eslint-disable @next/next/no-img-element */
import HeaderSection from "@/shared/components/HeaderSection";
import { Card } from "@/shared/components/ui/Card";
import { Container } from "@/shared/components/ui/Container";
import { ContainerPadding } from "@/shared/components/ui/ContainerPadding";
import { TypographyH3 } from "@/shared/components/ui/TypographyH3";
import { IMAGE_SERVICE_1 } from "@/shared/constants/image";

export default function ServiceSection() {
  const listServices = [
    {
      title: "Landing Page",
      description: "Creating an effective landing page with modern design",
    },
    {
      title: "Multi-page website",
      description: "Creating an effective landing page with modern design",
    },
    {
      title: "Catalogs and databases",
      description: "Creating an effective landing page with modern design",
    },
  ];
  return (
    <section className="px-4 lg:px-8">
      <ContainerPadding>
        <Container>
          <div className="flex flex-col gap-8 lg:gap-12">
            <HeaderSection
              title="Our Services"
              subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Non inventore
          accusantium minus quisquam natus error! Vero dolor totam nostrum
          laborum."
            />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 duration-300">
              {listServices.map((item, index) => (
                <Card key={index}>
                  <div className="flex flex-col gap-4 text-center aspect-3/4 justify-between items-center relative">
                    {/* top  */}
                    <div className="p-4 lg:p-6 uppercase text-xs flex text-background gap-1 font-haffer-mono-regular">
                      <p className="bg-muted py-1 px-2 rounded-full">
                        mermbership
                      </p>
                      <p className="bg-muted py-1 px-2 rounded-sm">
                        part of the
                      </p>
                    </div>

                    {/* content  */}
                    <div className="flex flex-col gap-4 px-4 lg:px-6">
                      <TypographyH3 text={item.title} />
                      <p className="max-md:text-xs text-sm text-paragraph max-w-3xs mx-auto">
                        {item.description}
                      </p>
                    </div>

                    {/* bottom  */}
                    <div className="w-full h-3/7 lg:pl-8 md:pl-6 pl-4">
                      <img
                        src={IMAGE_SERVICE_1}
                        alt=""
                        className="object-cover w-full h-full object-top-left rounded-tl-2xl"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </ContainerPadding>
    </section>
  );
}
