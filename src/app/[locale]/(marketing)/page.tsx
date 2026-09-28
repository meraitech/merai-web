import { setRequestLocale } from "next-intl/server";
import { Hero7 } from "./_components/hero-7";
import { Brief } from "./_components/brief";
import { TrustedBy } from "./_components/trusted-by";
import { FeatureCards } from "./_components/feature-cards";
import { FeatureHighlight } from "./_components/feature-highlight";
import SocialProof5 from "./_components/social-proof-4";
import FAQ from "@/shared/components/common/faq";
import { News } from "./_components/news";
import Showcase5 from "@/features/works/components/showcase-5";
import Features6 from "./_components/features-6";
import { HowItWorksCarousel } from "./_components/how-it-works-carousel";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <Hero7 />
      <TrustedBy />
      <Brief />
      <Showcase5 />
      <FeatureCards />
      <FeatureHighlight />
      <Features6 />
      <HowItWorksCarousel />
      <SocialProof5 />
      <FAQ />
      <News />
    </div>
  );
}
