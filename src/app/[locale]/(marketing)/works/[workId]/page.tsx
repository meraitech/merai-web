import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Blog5 } from "@/features/works/components/blog-5";
import { getWorkBySlug, getWorkSlugs } from "@/features/works/data/works";
import { pageMetadata } from "@/i18n/metadata";

interface Props {
  params: Promise<{ locale: string; workId: string }>;
}

export function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ workId: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, workId } = await params;
  const work = getWorkBySlug(workId);
  if (!work) return {};
  return pageMetadata({
    locale,
    path: `/works/${workId}`,
    title: `${work.title} — ${work.client}`,
    description: `Case study: ${work.title} for ${work.client} (${work.year}).`,
  });
}

export default async function Page({ params }: Props) {
  const { locale, workId } = await params;
  setRequestLocale(locale);

  const work = getWorkBySlug(workId);

  if (!work) {
    notFound();
  }

  return <Blog5 work={work} />;
}
