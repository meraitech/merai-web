"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SquarePen } from "lucide-react";
import { FaLinkedin, FaTwitter } from "react-icons/fa6";
import CTA from "./cta";
import GlassTiles from "@/shared/components/glass-tiles-tw";

export function Footer() {
  const t = useTranslations("Footer");

  const servicesList: string[] = t.raw("servicesList");
  const companyList: string[] = t.raw("companyList");

  const companySlugs: Record<string, string> = {
    About: "/about",
    Works: "/works",
    Contact: "/contact",
  };

  return (
    <div className="flex flex-col ">
      <CTA />

      <div className="w-full relative flex flex-col bg-white dark:bg-neutral-950">
        <GlassTiles opacity={0.5} tileDensity={3} />

        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <div className="flex flex-col space-y-6">
              <h3 className="text-xs font-medium tracking-tight text-neutral-400 uppercase">
                {t("services")}
              </h3>
              <ul className="flex flex-col space-y-4">
                {servicesList.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col space-y-6">
              <h3 className="text-xs font-medium tracking-tight text-neutral-400 uppercase">
                {t("company")}
              </h3>
              <ul className="flex flex-col space-y-4">
                {companyList.map((item) => (
                  <li key={item}>
                    <Link
                      href={companySlugs[item] ?? "/"}
                      className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col space-y-6">
              <h3 className="text-xs font-medium tracking-tight text-neutral-400 uppercase">
                {t("tagline")}
              </h3>
            </div>

            <div className="flex flex-col space-y-6">
              <h3 className="text-xs font-medium tracking-tight text-neutral-400 uppercase">
                {t("connect")}
              </h3>
              <a
                href={`mailto:support@merai.tech`}
                className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors break-words"
              >
                support@merai.tech
              </a>
              <div className="flex flex-col space-y-2">
                <h4 className="text-xs font-medium tracking-tight text-neutral-400 uppercase">
                  {t("address")}
                </h4>
                <div className="flex flex-col space-y-1">
                  {t.raw("addressLines").map((line: string, index: number) => (
                    <p key={index} className="text-sm text-neutral-700 dark:text-neutral-300">
                      {line}
                    </p>
                  ))}
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 pt-2">
                    <span className="text-neutral-400">{t("fax")}:</span> {t("faxNumber")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 select-none">
              <img
                src="/__merai__/logo.webp"
                alt="Merai"
                className="h-8 w-auto dark:invert invert-0"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
              <span className="text-sm font-medium tracking-tight dark:text-white text-neutral-900">
                {t("copyright")}
              </span>

              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="dark:text-white text-neutral-900 hover:text-neutral-600 transition-colors"
                >
                  <FaLinkedin className="w-5 h-5" strokeWidth={2.5} />
                </a>
                <a
                  href="#"
                  className="dark:text-white text-neutral-900 hover:text-neutral-600 transition-colors"
                >
                  <FaTwitter className="w-5 h-5" strokeWidth={2.5} />
                </a>
                <a
                  href="#"
                  className="dark:text-white text-neutral-900 hover:text-neutral-600 transition-colors"
                >
                  <SquarePen className="w-5 h-5" strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto w-full mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium tracking-tight text-neutral-500 dark:text-neutral-400 uppercase">
                  {t("parentCompany")}
                </span>
                <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">
                  {t("parentCompanyName")}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-px h-6 bg-gradient-to-b from-neutral-400 to-neutral-300 dark:from-neutral-600 dark:to-neutral-700"></div>
                <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600 -mt-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
