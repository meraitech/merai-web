"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FaLinkedin, FaTwitter } from "react-icons/fa6";
import { ArrowRight, Check } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import CTA from "./cta";
import { GiantBrand } from "@/shared/components/giant-brand";
import { Container } from "@/shared/components/ui/container";
import { softEase } from "@/shared/utils/motion";

const COMPANY_HREFS: Record<string, string> = {
  About: "/about",
  Tentang: "/about",
  Works: "/works",
  Karya: "/works",
  Contact: "/contact",
  Kontak: "/contact",
};

const CONTACT_EMAIL = "info@orphicgavel.com";

function Newsletter(): ReactNode {
  const t = useTranslations("Footer");
  const [done, setDone] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setDone(true);
  };
  return (
    <div className="max-w-[26rem]">
      <h2 className="font-serif text-[2rem] leading-none tracking-[-0.01em] text-neutral-900 dark:text-white">
        {t("newsletterTitle")}
      </h2>
      <p className="mt-2 text-[15px] text-neutral-600 dark:text-neutral-400">
        {t("newsletterDescription")}
      </p>
      <form
        onSubmit={onSubmit}
        className="relative mt-6"
        aria-label="Newsletter signup"
      >
        <label htmlFor="footer-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          name="email"
          required
          disabled={done}
          placeholder={t("newsletterPlaceholder")}
          autoComplete="email"
          className="h-13 w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 pr-14 pl-4 text-[15px] text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 disabled:opacity-80"
        />
        <button
          type="submit"
          aria-label={done ? t("newsletterSuccess") : t("newsletterSubmit")}
          disabled={done}
          className="absolute top-1.5 right-1.5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 transition-[opacity,transform] hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 active:scale-95 disabled:bg-emerald-600 disabled:text-white"
        >
          {done ? (
            <Check className="h-4 w-4" aria-hidden />
          ) : (
            <ArrowRight className="h-4 w-4" aria-hidden />
          )}
        </button>
      </form>
      <p
        role="status"
        aria-live="polite"
        className={`mt-2 text-sm text-neutral-600 dark:text-neutral-400 transition-opacity ${done ? "opacity-100" : "opacity-0"}`}
      >
        {done ? t("newsletterSuccess") : " "}
      </p>
    </div>
  );
}

export function Footer() {
  const t = useTranslations("Footer");
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const rise = useTransform(scrollYProgress, [0, 1], ["52%", "0%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [0.3, 1]);

  const servicesList: string[] = t.raw("servicesList");
  const companyList: string[] = t.raw("companyList");
  const legalList: string[] = t.raw("legalList");
  const addressLines: string[] = t.raw("addressLines");

  const columns: { title: string; links: { label: string; href: string }[] }[] =
    [
      {
        title: t("services"),
        links: servicesList.map((label) => ({ label, href: "#" })),
      },
      {
        title: t("company"),
        links: companyList.map((label) => ({
          label,
          href: COMPANY_HREFS[label] ?? "/",
        })),
      },
      {
        title: t("connect"),
        links: [
          { label: "Email", href: `mailto:${CONTACT_EMAIL}` },
          { label: "LinkedIn", href: "#" },
          { label: "X", href: "#" },
        ],
      },
    ];

  return (
    <div className="flex flex-col">
      <CTA />

      <footer
        ref={ref}
        aria-labelledby="footer-heading"
        className="relative overflow-hidden bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

        <Container>
          <motion.div style={reducedMotion ? {} : { y: rise, opacity: fade }}>
            <GiantBrand
              text="Merai"
              className="text-neutral-900/[0.08] dark:text-white/[0.14]"
            />
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: softEase }}
            className="relative -mt-px mb-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-6 pt-10 pb-6 sm:mb-6 sm:px-10 sm:pt-12 lg:px-12"
          >
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-8">
              <div>
                <Newsletter />
                <div className="mt-8 flex flex-col space-y-2">
                  <h3 className="text-xs font-medium tracking-[0.08em] text-neutral-900/85 dark:text-white/85 uppercase">
                    {t("address")}
                  </h3>
                  <div className="flex flex-col space-y-1">
                    {addressLines.map((line: string, index: number) => (
                      <p
                        key={index}
                        className="text-sm text-neutral-600 dark:text-neutral-400"
                      >
                        {line}
                      </p>
                    ))}
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 pt-2">
                      <span className="text-neutral-500 dark:text-neutral-500">
                        {t("fax")}:
                      </span>{" "}
                      {t("faxNumber")}
                    </p>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-sm font-medium text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors break-words pt-1"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </div>

              <nav aria-label="Footer">
                <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
                  {columns.map((col) => (
                    <div key={col.title}>
                      <h3 className="text-xs font-medium tracking-[0.08em] text-neutral-900/85 dark:text-white/85 uppercase">
                        {col.title}
                      </h3>
                      <ul className="mt-5 space-y-3">
                        {col.links.map((l) =>
                          col.title === t("company") ? (
                            <li key={l.label}>
                              <Link
                                href={l.href}
                                className="group inline-flex items-center gap-1 rounded-sm text-[15px] text-neutral-600 dark:text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
                              >
                                <span className="relative">
                                  {l.label}
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-neutral-900 dark:bg-white transition-transform duration-300 ease-out group-hover:scale-x-100"
                                  />
                                </span>
                              </Link>
                            </li>
                          ) : (
                            <li key={l.label}>
                              <a
                                href={l.href}
                                className="group inline-flex items-center gap-1 rounded-sm text-[15px] text-neutral-600 dark:text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
                                {...(l.href.startsWith("http")
                                  ? { rel: "noreferrer noopener" }
                                  : {})}
                              >
                                <span className="relative">
                                  {l.label}
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-neutral-900 dark:bg-white transition-transform duration-300 ease-out group-hover:scale-x-100"
                                  />
                                </span>
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </nav>
            </div>

            <div className="mt-14 flex flex-col gap-4 border-t border-neutral-200 dark:border-neutral-800 pt-6 pb-10 text-sm text-neutral-500 dark:text-neutral-400 sm:pb-0">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <img
                    src="/__merai__/logo.webp"
                    alt="Merai"
                    className="h-6 w-auto dark:invert invert-0"
                  />
                  <span className="inline-flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:hidden" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    {t("status")}
                  </span>
                  <span>{t("copyright")}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <div className="flex items-center gap-4">
                    <a
                      href="#"
                      aria-label="LinkedIn"
                      className="text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                    >
                      <FaLinkedin className="w-5 h-5" strokeWidth={2.5} />
                    </a>
                    <a
                      href="#"
                      aria-label="X"
                      className="text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                    >
                      <FaTwitter className="w-5 h-5" strokeWidth={2.5} />
                    </a>
                  </div>
                  <ul className="flex flex-wrap items-center gap-5">
                    {legalList.map((l) => (
                      <li key={l}>
                        <a
                          href="#"
                          className="rounded-sm transition-colors hover:text-neutral-900 dark:hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
                        >
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </footer>
    </div>
  );
}
