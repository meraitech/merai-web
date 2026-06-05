import { setRequestLocale } from "next-intl/server";
import { Hero7 } from "./_components/hero-7";
import SocialProof5 from "./_components/social-proof-4";
import FAQ from "@/shared/components/common/faq";
import Showcase5 from "@/features/works/components/showcase-5";
import Features6 from "./_components/features-6";
import Stats6 from "./_components/stats-6";
import HowItWorks6 from "./_components/how-it-works-6";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <Hero7 />
      <Features6 />
      <Showcase5 />
      <Stats6 />
      <HowItWorks6 />
      <SocialProof5 />
      <FAQ />
    </div>
  );
}
