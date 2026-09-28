import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { NewsArticle } from "@/features/news/components/news-article";
import { getNewsPost, getNewsSlugs } from "@/features/news/data/news";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getNewsSlugs().map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getNewsPost(slug);

  if (!post) {
    notFound();
  }

  return <NewsArticle slug={slug} />;
}
