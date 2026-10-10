import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { NewsArticle } from "@/features/news/components/news-article";
import { getNewsPost, getNewsSlugs } from "@/features/news/data/news";
import { pageMetadata } from "@/i18n/metadata";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!getNewsPost(slug)) return {};
  const t = await getTranslations({ locale, namespace: "News" });
  const body = t.raw(`posts.${slug}.body`) as string[] | undefined;
  return pageMetadata({
    locale,
    path: `/news/${slug}`,
    title: t(`posts.${slug}.title`),
    description: body?.[0]?.slice(0, 160) ?? t("description"),
  });
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
