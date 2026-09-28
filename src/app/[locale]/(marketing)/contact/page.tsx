import Contact2 from "@/features/contact/components/contact-2";
import { Hero12 } from "@/features/contact/components/hero-12";
import React from "react";
import FAQ from "@/shared/components/common/faq";
import { setRequestLocale, getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("title"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <Hero12 />
      <Contact2 />
      <FAQ />
    </div>
  );
}
