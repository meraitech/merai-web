"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function About6() {
  const t = useTranslations("About");

  const founders = [{ id: 1 }, { id: 2 }];

  return (
    <section className="w-full flex items-start py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight"
        >
          <span className="text-neutral-900 dark:text-white">
            {t("team.heading")}{" "}
          </span>
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col gap-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-neutral-700 dark:text-neutral-300"
            >
              <span className="w-3 h-3 bg-neutral-900 dark:bg-white rounded-sm" />
              {t("team.foundersLabel")}
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-xs"
            >
              {t("team.foundersDescription")}
            </motion.p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {founders.map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                whileHover={{ y: -4 }}
                className="relative flex flex-col rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] cursor-pointer overflow-hidden"
              >
                <div className="p-2">
                  <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                    <img
                      src={t(`team.member${f.id}.image`)}
                      alt={t(`team.member${f.id}.name`)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="px-6 pt-4 pb-6 flex flex-col gap-1">
                  <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white">
                    {t(`team.member${f.id}.name`)}
                  </h3>
                  <span className="text-xs tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-500 mt-1">
                    {t(`team.member${f.id}.role`)}
                  </span>
                </div>

                <div className="flex items-center justify-between pl-6 pr-2 py-2">
                  <span className="text-xs tracking-[0.15em] uppercase text-neutral-900 dark:text-white font-medium">
                    {t("team.viewProfile")}
                  </span>
                  <span className="w-11 h-11 rounded-lg rounded-br-[15px] bg-neutral-900 dark:bg-white flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white dark:text-neutral-900" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
