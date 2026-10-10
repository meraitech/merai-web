import React from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Showcase4 from "@/features/works/components/showcase-4";
import { pageMetadata } from "@/i18n/metadata";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Works" });
  return pageMetadata({
    locale,
    path: "/works",
    title: `${t("heading")} — ${t("subheading")}`,
    description: t("subheading"),
  });
}

export default async function Works({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <Showcase4 />
    </div>
  );
}
