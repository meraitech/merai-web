import { setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Galaxy from "./(marketing)/_components/galaxy";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: 0,
          pointerEvents: "none",
          zIndex: -1,
        }}
      >
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.1}
          saturation={0}
          hueShift={80}
          twinkleIntensity={0.1}
          rotationSpeed={0}
          repulsionStrength={1.5}
          autoCenterRepulsion={0}
          starSpeed={0.2}
          speed={0.4}
        />
      </div>
      {children}
    </NextIntlClientProvider>
  );
}
