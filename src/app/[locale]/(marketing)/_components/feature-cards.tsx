"use client";

import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/shared/components/ui/container";
import { SectionHeading } from "@/shared/components/ui/section-heading";

const ease = [0.16, 1, 0.3, 1] as const;

type FeatureVisual = "comparison" | "chart" | "code";

type FeatureCardData = {
  title: string;
  description: string;
  href: string;
  visual: FeatureVisual;
};

type ComparisonRow = {
  name: string;
  speed: string;
  fees: string;
  highlight: boolean;
};

function ComparisonVisual({
  speedLabel,
  feesLabel,
  rows,
}: {
  speedLabel: string;
  feesLabel: string;
  rows: ComparisonRow[];
}): ReactNode {

  return (
    <div className="w-full h-full flex items-end justify-center p-6">
      <div className="w-full max-w-xs">
        <div className="grid grid-cols-3 text-xs text-neutral-500 dark:text-neutral-400 pb-2 border-b border-neutral-200 dark:border-neutral-800">
          <div />
          <div className="text-center">{speedLabel}</div>
          <div className="text-center">{feesLabel}</div>
        </div>
        {rows.map((row, i) => (
          <motion.div
            key={row.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1, ease }}
            className={`grid grid-cols-3 py-3 text-sm ${i < rows.length - 1 ? "border-b border-neutral-200 dark:border-neutral-800" : ""} ${row.highlight ? "" : "text-neutral-500 dark:text-neutral-400"}`}
          >
            <div className={row.highlight ? "flex items-center gap-2" : ""}>
              {row.highlight && (
                <div className="w-4 h-4 rounded-full bg-neutral-900 dark:bg-white" />
              )}
              <span
                className={
                  row.highlight
                    ? "text-neutral-900 dark:text-white font-medium"
                    : ""
                }
              >
                {row.name}
              </span>
            </div>
            <div
              className={`text-center ${row.highlight ? "text-foreground" : ""}`}
            >
              {row.speed}
            </div>
            <div
              className={`text-center ${row.highlight ? "text-foreground" : ""}`}
            >
              {row.fees}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ChartVisual({
  metricLabel,
  metricValue,
  metricNote,
}: {
  metricLabel: string;
  metricValue: string;
  metricNote: string;
}): ReactNode {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 sm:p-6">
      <div className="relative w-full max-w-xs">
        <div className="mb-3">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            {metricLabel}
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-foreground">
            {metricValue}
          </div>
        </div>
        <div className="flex items-end justify-between gap-2 h-24 sm:h-32">
          {[0.3, 0.45, 0.55, 0.5, 0.65, 0.7, 0.75, 0.85, 0.9, 1].map(
            (height, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-linear-to-t from-foreground/80 to-foreground/40 rounded-t origin-bottom"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease }}
                style={{ height: `${height * 100}%` }}
              />
            )
          )}
        </div>
        <div className="flex items-center justify-end gap-1 mt-3">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {metricNote}
          </span>
        </div>
      </div>
    </div>
  );
}

function CodeVisual(): ReactNode {
  const codeLines = [
    { text: "--stack '{", style: "text-neutral-500 dark:text-neutral-400" },
    { text: "  'nextjs-app'", style: "text-foreground" },
    { text: "  'typescript'", style: "text-foreground" },
    { text: "  'api-routes'", style: "text-foreground" },
    { text: "  'ci-cd'", style: "text-foreground" },
    { text: "  'unit-tests'", style: "text-foreground" },
    { text: "  'monitoring'", style: "text-foreground" },
    { text: "}'", style: "text-neutral-500 dark:text-neutral-400" },
  ];

  return (
    <div className="w-full h-full flex items-center justify-start p-6 overflow-hidden">
      <pre className="text-xs sm:text-sm font-mono leading-relaxed">
        <code>
          {codeLines.map((line, i) => (
            <motion.span
              key={i}
              className={`block ${line.style}`}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05, ease }}
            >
              {line.text}
            </motion.span>
          ))}
        </code>
      </pre>
    </div>
  );
}

function FeatureCard({
  card,
  index,
  learnMore,
  speedLabel,
  feesLabel,
  rows,
  metricLabel,
  metricValue,
  metricNote,
}: {
  card: FeatureCardData;
  index: number;
  learnMore: string;
  speedLabel: string;
  feesLabel: string;
  rows: ComparisonRow[];
  metricLabel: string;
  metricValue: string;
  metricNote: string;
}): ReactNode {
  return (
    <motion.a
      href={card.href}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      className="group flex flex-col bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-sm overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-lg transition-[border-color,box-shadow]"
    >
      <div className="relative h-56 sm:h-64 bg-white dark:bg-neutral-950">
        {card.visual === "comparison" && (
          <ComparisonVisual
            speedLabel={speedLabel}
            feesLabel={feesLabel}
            rows={rows}
          />
        )}
        {card.visual === "chart" && (
          <ChartVisual
            metricLabel={metricLabel}
            metricValue={metricValue}
            metricNote={metricNote}
          />
        )}
        {card.visual === "code" && <CodeVisual />}
      </div>
      <div className="flex flex-col p-6">
        <h3 className="text-lg font-medium font-serif text-neutral-900 dark:text-white">
          {card.title}
        </h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {card.description}
        </p>
        <div className="flex items-center gap-1 mt-4 text-sm font-medium text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
          {learnMore}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.a>
  );
}

export function FeatureCards(): ReactNode {
  const t = useTranslations("Home.standard");
  const locale = useLocale();
  const worksHref = `/${locale}/works`;

  const rows: ComparisonRow[] = [1, 2, 3].map((i) => ({
    name: t(`row${i}.name`),
    speed: t(`row${i}.speed`),
    fees: t(`row${i}.fees`),
    highlight: i === 1,
  }));

  const features: FeatureCardData[] = [
    {
      title: t("card1.title"),
      description: t("card1.description"),
      href: worksHref,
      visual: "comparison",
    },
    {
      title: t("card2.title"),
      description: t("card2.description"),
      href: worksHref,
      visual: "chart",
    },
    {
      title: t("card3.title"),
      description: t("card3.description"),
      href: worksHref,
      visual: "code",
    },
  ];

  return (
    <section className="relative w-full bg-white dark:bg-neutral-950">
      <Container spacing="generous">
        <SectionHeading
          title={t("headingLine1")}
          accent={t("headingLine2")}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((card, index) => (
            <FeatureCard
              key={card.title}
              card={card}
              index={index}
              learnMore={t("learnMore")}
              speedLabel={t("tableSpeed")}
              feesLabel={t("tableFees")}
              rows={rows}
              metricLabel={t("metricLabel")}
              metricValue={t("metricValue")}
              metricNote={t("metricNote")}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
