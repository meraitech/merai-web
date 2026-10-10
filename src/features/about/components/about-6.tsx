"use client";

import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const MEMBER_IDS = [1, 2, 3];

const SOCIAL_LINKS: Record<number, { label: string; href: string; icon: typeof FaGithub }[]> = {
  1: [
    { label: "Instagram", href: "https://www.instagram.com/ysfhdrl", icon: FaInstagram },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yusufhidral", icon: FaLinkedin },
  ],
  2: [
    { label: "Instagram", href: "https://www.instagram.com/ranaufalm/", icon: FaInstagram },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ranaufalmuha/", icon: FaLinkedin },
    { label: "GitHub", href: "https://github.com/ranaufalmuha", icon: FaGithub },
    { label: "X", href: "https://x.com/ranaufalmuha", icon: FaXTwitter },
  ],
};

export default function About6() {
  const t = useTranslations("About");

  return (
    <section id="team" className="w-full flex items-start py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950 scroll-mt-20">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto w-full max-w-[1400px]"
      >
        <div className="max-w-2xl">
          <motion.h2
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900 dark:text-white"
          >
            {t("team.heading")}
          </motion.h2>
          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400"
          >
            {t("team.description")}
          </motion.p>
        </div>

        <motion.div
          variants={grid}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {MEMBER_IDS.map((id) => {
            const name = t(`team.member${id}.name`);
            const role = t(`team.member${id}.role`);
            const image = t(`team.member${id}.image`);
            const city = t(`team.member${id}.city`);
            const bio = t(`team.member${id}.bio`);
            const tags = t.raw(`team.member${id}.tags`) as string[];

            return (
              <motion.article
                key={id}
                variants={item}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-[box-shadow,border-color] duration-300 hover:shadow-lg hover:shadow-neutral-950/5 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-neutral-700 dark:hover:shadow-none"
              >
                <div className="flex items-start justify-between gap-3">
                  <img
                    src={image}
                    alt={name}
                    className="h-16 w-16 rounded-full object-cover ring-1 ring-black/5 dark:ring-white/10"
                  />
                  <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-300">
                    {city}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-semibold text-neutral-900 dark:text-white">
                  {name}
                </h3>
                <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">
                  {role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {bio}
                </p>

                <div className="mb-5 mt-4 flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-1 pt-4">
                  {(SOCIAL_LINKS[id] ?? []).map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${name} on ${link.label}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white dark:focus-visible:ring-white/40"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
