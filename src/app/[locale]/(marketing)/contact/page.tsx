import ContactInfo from "@/features/contact/components/contact-info";
import { ContactHero } from "@/features/contact/components/contact-hero";
import React from "react";
import FAQ from "@/shared/components/common/faq";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { pageMetadata } from "@/i18n/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact.hero" });
  return pageMetadata({
    locale,
    path: "/contact",
    title: `${t("title")} ${t("subtitle")}`,
    description: t("description"),
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <ContactHero />
      <ContactInfo />
      <FAQ />
    </div>
  );
}
