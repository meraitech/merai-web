"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/shared/components/ui/link";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();

  const otherLocale = locale === "en" ? "id" : "en";
  const langLabel = locale === "en" ? "ID" : "EN";

  return (
    <div className="w-full relative h-33 bg-white dark:bg-neutral-950">
      <nav className="fixed w-full px-4 sm:px-6 py-6 sm:py-8 z-30">
        <div className="mx-auto w-full max-w-[1400px] ">
          {/* Desktop Navigation */}
          <motion.div
            className="relative mx-auto hidden lg:block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="mx-auto w-fit rounded-3xl bg-white/40 backdrop-blur-2xl border border-neutral-200/50 shadow-xl dark:bg-neutral-950/20 dark:border-neutral-800/50 overflow-hidden">
              <div className="flex items-center justify-between gap-2 pl-6 pr-3 py-3 ">
                <Link
                  href="/"
                  className="flex items-center text-xl font-medium text-tighter text-neutral-900 dark:text-white mr-6"
                >
                  Merai
                </Link>

                <div className="flex items-center gap-1">
                  <Link
                    href="/works"
                    className="px-4 py-2 text-sm tracking-tight font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-full"
                  >
                    {t("works")}
                  </Link>
                  <Link
                    href="/about"
                    className="px-4 py-2 text-sm tracking-tight font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-full"
                  >
                    {t("about")}
                  </Link>
                  <Link
                    href="/blog"
                    className="px-4 py-2 text-sm tracking-tight font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-full"
                  >
                    Blog
                  </Link>
                </div>

                <div className="flex items-center gap-2 ml-6">
                  <Link
                    href={pathname}
                    locale={otherLocale}
                    className="px-4 py-2 tracking-tight text-sm font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  >
                    {langLabel}
                  </Link>
                  <Link
                    href="/contact"
                    className="px-5 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black text-sm font-light tracking-tight hover:bg-neutral-800 dark:hover:bg-neutral-200"
                  >
                    {t("contactUs")}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile Navigation */}
          <motion.div
            className="lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="rounded-3xl bg-white/40 backdrop-blur-2xl border border-neutral-300 shadow-xl dark:bg-neutral-950/20 dark:border-neutral-800/50 overflow-hidden">
              <div className="flex items-center justify-between pl-4 pr-3 py-3">
                <Link
                  href="/"
                  className="text-xl font-medium text-tighter text-neutral-900 dark:text-white"
                >
                  Merai
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black"
                  aria-label={
                    mobileMenuOpen ? t("closeMenu") : t("openMenu")
                  }
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </div>

              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-2">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <Link
                            href="/works"
                            className="block py-2 px-2 text-sm font-medium text-neutral-900 dark:text-white"
                          >
                            {t("works")}
                          </Link>
                          <Link
                            href="/about"
                            className="block py-2 px-2 text-sm font-medium text-neutral-900 dark:text-white"
                          >
                            {t("about")}
                          </Link>
                          <Link
                            href="/blog"
                            className="block py-2 px-2 text-sm font-medium text-neutral-900 dark:text-white"
                          >
                            Blog
                          </Link>
                        </div>

                        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                          <Link
                            href={pathname}
                            locale={otherLocale}
                            className="block py-2 px-2 text-sm font-medium text-neutral-600 dark:text-neutral-400"
                          >
                            {langLabel}
                          </Link>
                          <Link
                            href="/contact"
                            className="block w-full text-center px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-medium"
                          >
                            {t("contactUs")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
