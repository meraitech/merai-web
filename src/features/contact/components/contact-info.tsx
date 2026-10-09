"use client";

import { ArrowUpRight, Clock, Mail, MapPin, Share2 } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";

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

const TINTS = {
  sky: "bg-[radial-gradient(140%_120%_at_10%_0%,#eefaff_0%,#c6f0fc_55%,#a3e4f6_100%)] dark:bg-[radial-gradient(140%_120%_at_10%_0%,#0d1c26_0%,#10283a_60%,#133447_100%)]",
  mint: "bg-[radial-gradient(140%_120%_at_10%_0%,#eefbf3_0%,#c9efd9_55%,#a6e2c2_100%)] dark:bg-[radial-gradient(140%_120%_at_10%_0%,#0e2119_0%,#133226_60%,#183f30_100%)]",
  amber:
    "bg-[radial-gradient(140%_120%_at_10%_0%,#fff6ec_0%,#ffdfc2_55%,#fbc9a0_100%)] dark:bg-[radial-gradient(140%_120%_at_10%_0%,#241912_0%,#33231a_60%,#402c1f_100%)]",
  violet:
    "bg-[radial-gradient(140%_120%_at_10%_0%,#f3f0ff_0%,#ddd0f7_55%,#c2abe9_100%)] dark:bg-[radial-gradient(140%_120%_at_10%_0%,#1a1430_0%,#251d45_60%,#312758_100%)]",
} as const;

const MAP_QUERY = "Indonesia+Stock+Exchange+Tower+2+Jakarta";
// Free OpenStreetMap embed (no API key). The legacy Google output=embed
// endpoint is dead (404), so Google is directions-link only.
const MAP_EMBED_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=106.8027%2C-6.2293%2C106.8147%2C-6.2173&layer=mapnik&marker=-6.2233%2C106.8087";

export default function ContactInfo() {
  const t = useTranslations("Contact");

  const email = t("info.email");
  const locationLines = t.raw("info.locationLines") as string[];
  const hoursLines = t.raw("info.hoursLines") as string[];

  // ponytail: placeholder hrefs, wire real profiles when available
  const socials = [
    { label: "LinkedIn", href: "#", icon: FaLinkedin },
    { label: "X", href: "#", icon: FaXTwitter },
  ];

  return (
    <section className="w-full flex items-start py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950">
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
            {t("info.heading")}
          </motion.h2>
          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400"
          >
            {t("info.description")}
          </motion.p>
        </div>

        <motion.div
          variants={grid}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16"
        >
          <motion.article
            variants={item}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-[box-shadow,border-color] duration-300 hover:shadow-lg hover:shadow-neutral-950/5 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-neutral-700 dark:hover:shadow-none"
          >
            <span
              aria-hidden="true"
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-neutral-700 dark:text-neutral-300 ${TINTS.sky}`}
            >
              <MapPin className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-5 text-base font-semibold text-neutral-900 dark:text-white">
              {t("info.locationLabel")}
            </h3>
            <address className="mt-2 text-sm leading-relaxed text-neutral-600 not-italic dark:text-neutral-400">
              {locationLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
            >
              {t("info.directions")}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </motion.article>

          <motion.article
            variants={item}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-[box-shadow,border-color] duration-300 hover:shadow-lg hover:shadow-neutral-950/5 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-neutral-700 dark:hover:shadow-none"
          >
            <span
              aria-hidden="true"
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-neutral-700 dark:text-neutral-300 ${TINTS.mint}`}
            >
              <Mail className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-5 text-base font-semibold text-neutral-900 dark:text-white">
              {t("info.emailLabel")}
            </h3>
            <a
              href={`mailto:${email}`}
              className="mt-2 text-sm font-medium text-neutral-900 break-all transition-colors hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
            >
              {email}
            </a>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {t("info.emailNote")}
            </p>
          </motion.article>

          <motion.article
            variants={item}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-[box-shadow,border-color] duration-300 hover:shadow-lg hover:shadow-neutral-950/5 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-neutral-700 dark:hover:shadow-none"
          >
            <span
              aria-hidden="true"
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-neutral-700 dark:text-neutral-300 ${TINTS.amber}`}
            >
              <Share2 className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-5 text-base font-semibold text-neutral-900 dark:text-white">
              {t("info.socialsLabel")}
            </h3>
            <div className="mt-2 flex flex-col gap-1">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={`Merai on ${s.label}`}
                    className="group inline-flex w-fit items-center gap-2 py-1 text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    {s.label}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </a>
                );
              })}
            </div>
          </motion.article>

          <motion.article
            variants={item}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-[box-shadow,border-color] duration-300 hover:shadow-lg hover:shadow-neutral-950/5 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-neutral-700 dark:hover:shadow-none"
          >
            <span
              aria-hidden="true"
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-neutral-700 dark:text-neutral-300 ${TINTS.violet}`}
            >
              <Clock className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-5 text-base font-semibold text-neutral-900 dark:text-white">
              {t("info.hoursLabel")}
            </h3>
            <div className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {hoursLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {t("info.responseNote")}
            </p>
          </motion.article>
        </motion.div>

        <motion.div
          variants={item}
          id="location"
          className="mt-6 scroll-mt-20 overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800"
        >
          <iframe
            title={t("info.locationLabel")}
            src={MAP_EMBED_SRC}
            className="h-[320px] w-full border-0 sm:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
