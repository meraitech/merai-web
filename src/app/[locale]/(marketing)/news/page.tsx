import { setRequestLocale, getTranslations } from "next-intl/server";
import { NewsList } from "@/features/news/components/news-list";
import { pageMetadata } from "@/i18n/metadata";

type Props = {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "News" });
  return pageMetadata({
    locale,
    path: "/news",
    title: t("heading"),
    description: t("description"),
  });
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <NewsList />;
}
