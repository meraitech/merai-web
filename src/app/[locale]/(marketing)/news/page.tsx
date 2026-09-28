import { setRequestLocale } from "next-intl/server";
import { NewsList } from "@/features/news/components/news-list";

type Props = {
  params: Promise<{ locale: string }>;
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <NewsList />;
}
