import { setRequestLocale, getTranslations } from "next-intl/server";
import { ServicesHero } from "@/features/services/components/services-hero";
import { ServicesDetail } from "@/features/services/components/services-detail";
import CTA from "@/shared/components/common/cta";
import FAQ from "@/shared/components/common/faq";
import { pageMetadata } from "@/i18n/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services.hero" });
  return pageMetadata({
    locale,
    path: "/services",
    title: `${t("line1")} ${t("line2")}`,
    description: t("description"),
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <ServicesHero />
      <ServicesDetail />
      <CTA />
      <FAQ />
    </div>
  );
}
