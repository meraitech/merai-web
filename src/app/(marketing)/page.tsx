import HeroSection from "./_components/sections/HeroSection";
import ServiceSection from "./_components/sections/ServiceSection";
import WhyChooseUsSection from "./_components/sections/WhyChooseUsSection";
import { WorkSection } from "./_components/sections/WorkSection";

export default function page() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="py-28 flex flex-col">
        <ServiceSection />
        <WhyChooseUsSection />
        <WorkSection />
      </div>
    </div>
  );
}
