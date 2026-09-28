"use client";

import { useTranslations } from "next-intl";

export function Hero12() {
  const t = useTranslations();

  return (
    <section className="relative w-full bg-white dark:bg-neutral-950 overflow-hidden px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-[1400px] mx-auto w-full h-full relative min-h-[600px]">
        <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-3xl overflow-hidden z-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2500&auto=format&fit=crop"
            alt={t("Contact.hero.description")}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 dark:bg-black/30 lg:bg-transparent" />
        </div>

        <div className="absolute top-0 left-0 z-10 w-full max-w-2xl flex flex-col items-start pointer-events-none">
          <div className="bg-white dark:bg-neutral-950 w-fit p-4 relative rounded-br-4xl pointer-events-auto">
            <h1 className="whitespace-nowrap text-2xl sm:text-5xl lg:text-7xl font-medium tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
              {t("Contact.hero.title")}
            </h1>
            <svg
              width="40"
              height="40"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 -right-10 rotate-180 text-white dark:text-neutral-950"
            >
              <path
                d="M0 200C155.996 199.961 200.029 156.308 200 0V200H0Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="bg-white dark:bg-neutral-950 w-fit p-4 relative rounded-br-4xl pointer-events-auto">
            <h1 className="whitespace-nowrap text-3xl sm:text-5xl lg:text-7xl font-medium tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
              {t("Contact.hero.subtitle")}
            </h1>

            <svg
              width="40"
              height="40"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 -right-10 rotate-180 text-white dark:text-neutral-950"
            >
              <path
                d="M0 200C155.996 199.961 200.029 156.308 200 0V200H0Z"
                fill="currentColor"
              />
            </svg>

            <svg
              width="40"
              height="40"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-10 left-0 rotate-180 text-white dark:text-neutral-950"
            >
              <path
                d="M0 200C155.996 199.961 200.029 156.308 200 0V200H0Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
