/* eslint-disable @next/next/no-img-element */
import HeaderSection from "@/shared/components/HeaderSection";
import { Container } from "@/shared/components/ui/Container";
import { ContainerPadding } from "@/shared/components/ui/ContainerPadding";
import GlassBackground from "@/shared/components/ui/GlassBackground";
import { TypographyH3 } from "@/shared/components/ui/TypographyH3";

export const ProcessSection = () => {
  const process = [
    {
      title: "Product Requirements",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non inventoreaccusantium minus quisquam natus error! Vero dolor totam nostrum laborum.",
      imageUrl: "https://assets.codepen.io/16327/2D-windmill.png",
    },
    {
      title: "2-Week Sprint",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non inventoreaccusantium minus quisquam natus error! Vero dolor totam nostrum laborum.",
      imageUrl: "https://assets.codepen.io/16327/2D-sparkle.png",
    },
    {
      title: "Weekly Reports",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non inventoreaccusantium minus quisquam natus error! Vero dolor totam nostrum laborum.",
      imageUrl: "https://assets.codepen.io/16327/2D-flower.png",
    },
  ];
  return (
    <div className="">
      <ContainerPadding>
        <Container>
          <div className="px-4 lg:px-8 mb-8 lg:mb-12">
            <HeaderSection
              title="Processes & Management"
              subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Non inventore
            accusantium minus quisquam natus error! Vero dolor totam nostrum
            laborum."
            />
          </div>
        </Container>

        {/* Content  */}
        <div className="flex flex-col">
          {process.map((item, index) => (
            <div
              key={index}
              className="border-t border-foreground/20 rounded-t-4xl p-4 md:p-8 lg:p-12 h-[60dvh] flex items-center justify-center relative overflow-hidden"
            >
              <Container>
                <div className="grid md:grid-cols-2">
                  {/* left  */}
                  <div className="flex items-center justify-center w-full h-full">
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="h-20 md:h-32 lg:h-40"
                    />
                  </div>

                  {/* right  */}
                  <div className="flex flex-col gap-2 md:gap-4 text-center">
                    <TypographyH3 text={item.title} />
                    <p className="max-md:text-sm lg:text-lg text-paragraph">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Container>
              <GlassBackground />
            </div>
          ))}
        </div>
      </ContainerPadding>
    </div>
  );
};
