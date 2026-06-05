import React from "react";
import { setRequestLocale } from "next-intl/server";
import Showcase4 from "@/features/works/components/showcase-4";

interface Props {
  params: Promise<{ locale: string }>;
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
