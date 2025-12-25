import HeroSection from "./_components/sections/HeroSection";
import { ProcessSection } from "./_components/sections/ProcessSection";
import ServiceSection from "./_components/sections/ServiceSection";
import WhyChooseUsSection from "./_components/sections/WhyChooseUsSection";
import { WorkSection } from "./_components/sections/WorkSection";

export default function page() {
  return (
    <div className="flex flex-col overflow-hidden">
      <HeroSection />
      <div className="py-28 flex flex-col">
        <ServiceSection />
        <WhyChooseUsSection />
        <WorkSection />
        <ProcessSection />
      </div>
    </div>
  );
}
