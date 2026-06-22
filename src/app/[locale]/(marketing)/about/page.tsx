import About1 from "@/features/about/components/about-1";
import About2 from "@/features/about/components/about-2";
import { Hero8 } from "@/features/about/components/hero-8";
import React from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import About6 from "@/features/about/components/about-6";

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

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <Hero8 />
      <About6 />
      {/*  <About1 />  */}
      {/* <Features5 /> */}
      <About2 />
    </div>
  );
}
