import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { H1HeaderUI } from "@/components/ui/h1-header.ui";
import WorkDetailContent from "@/features/works/components/WorkDetailContent";
import workProjects from "@/assets/jsons/works.json";

type ProjectRouteParams = {
  workId: string;
};

type ProjectDetailProps = {
  params: ProjectRouteParams | Promise<ProjectRouteParams>;
};

export function generateStaticParams() {
  return workProjects.map((project) => ({
    workId: project.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailProps): Promise<Metadata | undefined> {
  const { workId } = await params;
  const numericId = Number(workId);

  if (Number.isNaN(numericId)) {
    return undefined;
  }

  const project = workProjects.find((item) => item.id === numericId);

  if (!project) {
    return undefined;
  }

  return {
    title: `${project.companyName} | Karya MERAI`,
    description: project.description,
    openGraph: {
      title: `${project.companyName} | Karya MERAI`,
      description: project.description,
      url: `/works/${project.id}`,
      type: "article",
    },
    twitter: {
      title: `${project.companyName} | Karya MERAI`,
      description: project.description,
    },
  };
}

export default async function ProjectDetail({ params }: ProjectDetailProps) {
  const { workId } = await params;
  const numericId = Number(workId);

  if (Number.isNaN(numericId)) {
    notFound();
  }

  const project =
    workProjects.find((item) => item.id === numericId) ?? notFound();

  return (
    <article className="flex w-full flex-col gap-8 max-w-[1200px] mx-auto">
      <header className="flex flex-col gap-12">
        <H1HeaderUI text={project.companyName} className="w-full text-start" />
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
          <span className="text-white/80">{project.date}</span>
          <ul className="flex flex-wrap items-center gap-2">
            {project.stack.map((stack) => (
              <li
                key={stack}
                className="border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70"
              >
                {stack}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <Image
        src={project.coverImage}
        alt={`${project.companyName} hero`}
        width={1920}
        draggable={false}
        height={1080}
        className="aspect-video w-full border border-white/5 object-cover"
      />

      <section className="space-y-6">
        <p className="text-base leading-7 text-muted">{project.overview}</p>
        <WorkDetailContent sections={project.detailSections} />
        <div className="grid md:grid-cols-2 gap-8">
          {project.images.map((imgUrl, index) => (
            <Image
              key={index}
              src={imgUrl.url}
              draggable={false}
              alt={project.companyName + " Image"}
              width={1024}
              height={724}
              className="w-full h-full"
            />
          ))}
        </div>
      </section>
    </article>
  );
}
