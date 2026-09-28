"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components/ui/button";

export default function Contact2() {
  const [agreed, setAgreed] = useState(false);
  const t = useTranslations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full bg-white py-16 dark:bg-neutral-950 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Company Info */}
          <div className="flex flex-col justify-between">
            {/* Top Section */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="mb-4 text-2xl font-normal text-neutral-900 dark:text-white sm:text-3xl"
              >
                {t("Contact.form.heading")}
              </motion.h2>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* First Name and Last Name */}
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder={t("Contact.form.firstName")}
                    className="w-full border-b border-neutral-300 bg-transparent pb-3 text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder={t("Contact.form.lastName")}
                    className="w-full border-b border-neutral-300 bg-transparent pb-3 text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder={t("Contact.form.email")}
                  className="w-full border-b border-neutral-300 bg-transparent pb-3 text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white"
                />
              </div>

              {/* Company */}
              <div>
                <input
                  type="text"
                  placeholder={t("Contact.form.company")}
                  className="w-full border-b border-neutral-300 bg-transparent pb-3 text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white"
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  placeholder={t("Contact.form.message")}
                  rows={1}
                  className="w-full resize-none border-b border-neutral-300 bg-transparent pb-3 text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white"
                />
              </div>

              {/* Privacy Agreement */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setAgreed(!agreed)}
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    agreed
                      ? "border-neutral-900 bg-neutral-900 dark:border-white dark:bg-white"
                      : "border-neutral-400 bg-transparent dark:border-neutral-600"
                  }`}
                >
                  {agreed && (
                    <svg
                      className="h-3 w-3 text-white dark:text-neutral-950"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
                <label className="text-sm text-neutral-600 dark:text-neutral-400">
                  {t("Contact.form.privacy")}{" "}
                  <a
                    href="#"
                    className="underline transition-colors hover:text-neutral-900 dark:hover:text-white"
                  >
                    {t("Contact.form.privacyLink")}
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  className="rounded-xl bg-neutral-900 px-12 py-4 text-base font-medium text-white transition-all hover:scale-105 dark:bg-white dark:text-neutral-900"
                >
                  {t("Contact.form.submit")}
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
