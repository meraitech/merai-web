import { CTAButton } from "../ui/CTAButton";
import { Container } from "../ui/Container";
import { ContainerPadding } from "../ui/ContainerPadding";

export default function Footer() {
  return (
    <div>
      <section className="text-background bg-foreground">
        <ContainerPadding>
          <Container>
            <div className="flex flex-col h-120 items-center justify-center text-center gap-12">
              <div className="flex flex-col gap-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl duration-300 font-haffer-medium">
                  Get started today
                </h2>
                <p className="max-w-lg">
                  Dont change your trusted systems. Explore how Reform can help
                  you supercharge your operations and save 2,000 hours a month.
                </p>
              </div>
              <CTAButton theme="color" />
            </div>
          </Container>
        </ContainerPadding>
      </section>

      <footer className="bg-accent text-background p-4 flex flex-col gap-40">
        <h2 className="sr-only">Footer</h2>
        <div className="flex justify-between">
          <div>
            <h3 className="mb-4">/ Reach Out</h3>
            <div className="">
              <h4 className="sr-only">Email</h4>
              <p className="text-xl">merai24@gmail.com</p>
            </div>
            <div className="">
              <h4 className="sr-only">Phone</h4>
              <p className="text-xl">+62 82285578265</p>
            </div>
          </div>

          <div className="flex gap-12">
            <nav>
              <h3 className="mb-4">/ Social</h3>
              <ul className="flex flex-col gap-2">
                <p>YouTube</p>
                <p>Instagram</p>
                <p>LinkedIn</p>
              </ul>
            </nav>
            <nav>
              <h3 className="mb-4">/ Navigations</h3>
              <ul className="flex flex-col gap-2">
                <p>Home</p>
                <p>About</p>
                <p>Works</p>
                <p>Pricing</p>
              </ul>
            </nav>
          </div>
        </div>

        <div className="text-end">
          © Merai Technology 2025 All rights reserved.
        </div>
      </footer>
    </div>
  );
}
