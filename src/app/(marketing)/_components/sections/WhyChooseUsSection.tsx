import HeaderSection from "@/shared/components/HeaderSection";
import Container from "@/shared/components/ui/Container";

export default function WhyChooseUsSection() {
  return (
    <div>
      <Container>
        <div className="flex flex-col gap-4 md:gap-8 lg:gap-12">
          <HeaderSection
            title="Why Choose Us"
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Non inventore
        accusantium minus quisquam natus error! Vero dolor totam nostrum
        laborum."
          />
        </div>
      </Container>
    </div>
  );
}
