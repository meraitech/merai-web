import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Blog5 } from "@/features/works/components/blog-5";
import { getWorkBySlug, getWorkSlugs } from "@/features/works/data/works";

interface Props {
  params: Promise<{ locale: string; workId: string }>;
}

export function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ workId: slug }));
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
