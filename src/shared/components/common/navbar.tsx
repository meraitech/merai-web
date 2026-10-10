"use client";

import { softEase } from "@/shared/utils/motion";
import { Link } from "@/shared/components/ui/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Building2, ChevronDown, Users } from "lucide-react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import { useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
  type FocusEvent,
  type ReactNode,
  type RefObject,
} from "react";

type Icon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

const quickEase = [0.55, 0, 1, 0.45] as const;

const SERVICE_TINTS = {
  sky: "bg-[radial-gradient(140%_120%_at_10%_0%,#eefaff_0%,#c6f0fc_55%,#a3e4f6_100%)] dark:bg-[radial-gradient(140%_120%_at_10%_0%,#0d1c26_0%,#10283a_60%,#133447_100%)]",
  mint: "bg-[radial-gradient(140%_120%_at_10%_0%,#eefbf3_0%,#c9efd9_55%,#a6e2c2_100%)] dark:bg-[radial-gradient(140%_120%_at_10%_0%,#0e2119_0%,#133226_60%,#183f30_100%)]",
  amber:
    "bg-[radial-gradient(140%_120%_at_10%_0%,#fff6ec_0%,#ffdfc2_55%,#fbc9a0_100%)] dark:bg-[radial-gradient(140%_120%_at_10%_0%,#241912_0%,#33231a_60%,#402c1f_100%)]",
} as const;

interface SubLink {
  titleKey: "service1" | "service2" | "service3" | "aboutStory" | "aboutTeam";
  descKey:
    | "service1desc"
    | "service2desc"
    | "service3desc"
    | "aboutStoryDesc"
    | "aboutTeamDesc";
  href: string;
  icon: Icon;
  tint: keyof typeof SERVICE_TINTS;
}

interface NavLink {
  labelKey: "services" | "works" | "about" | "news";
  href: string;
  items?: readonly SubLink[];
}

const LINKS: readonly NavLink[] = [
  { labelKey: "services", href: "/services" },
  { labelKey: "works", href: "/works" },
  {
    labelKey: "about",
    href: "/about",
    items: [
      {
        titleKey: "aboutStory",
        descKey: "aboutStoryDesc",
        href: "/about",
        icon: Building2,
        tint: "sky",
      },
      {
        titleKey: "aboutTeam",
        descKey: "aboutTeamDesc",
        href: "/about#team",
        icon: Users,
        tint: "mint",
      },
    ],
  },
  { labelKey: "news", href: "/news" },
];

type Variant = "glass" | "solid";

const HERO_ID = "hero";

const DOCKED_COLUMN = "mx-auto max-w-[1400px]";
const DESKTOP_QUERY = "(min-width: 768px)";

// Named timing constants — no magic numbers in scroll/animation props.
// Threshold matches the overlay header offset (`top-6`) so the solid bar
// engages as soon as the page moves, not after the whole hero scrolls away.
const NAV_TIMING = {
  dockedThresholdPx: 24,
} as const;

const CONTROL_RADIUS = "rounded-[0.75rem]";
const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400";

const EASE_OUT: Transition = { duration: 0.4, ease: softEase };
const EASE_IN: Transition = { duration: 0.25, ease: quickEase };

const LINK_CLASS = `inline-flex h-10 items-center px-3.5 whitespace-nowrap text-sm font-medium text-neutral-600 dark:text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-white ${FOCUS_RING} ${CONTROL_RADIUS}`;
const PRIMARY_CLASS = `inline-flex h-10 items-center bg-neutral-900 dark:bg-white px-4 whitespace-nowrap text-sm font-medium text-white dark:text-neutral-900 transition-opacity hover:opacity-85 ${FOCUS_RING} ${CONTROL_RADIUS}`;

const PANEL_SURFACE: Record<Variant, string> = {
  glass:
    "border-neutral-200/60 bg-white/70 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.28)] backdrop-blur-xl dark:border-neutral-800/60 dark:bg-neutral-950/70 supports-[not(backdrop-filter:blur(0))]:bg-white/95 dark:supports-[not(backdrop-filter:blur(0))]:bg-neutral-950/95",
  solid:
    "border-neutral-200 bg-white shadow-[0_12px_40px_-16px_rgba(0,0,0,0.18)] dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.6)]",
};

function SubLinkRow({
  title,
  description,
  href,
  icon: RowIcon,
  tint,
  onClick,
  className,
}: {
  title: string;
  description: string;
  href: string;
  icon: Icon;
  tint: keyof typeof SERVICE_TINTS;
  onClick?: (() => void) | undefined;
  className?: string;
}): ReactNode {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group/row flex items-center gap-3 rounded-[0.5rem] p-2 transition-colors hover:bg-neutral-900/[0.05] dark:hover:bg-white/[0.05] ${FOCUS_RING} ${className ?? ""}`}
    >
      <span
        aria-hidden="true"
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.4rem] text-neutral-700 dark:text-neutral-300 ${SERVICE_TINTS[tint]}`}
      >
        <RowIcon className="h-4 w-4" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-sm leading-5 font-medium text-neutral-900 dark:text-white">
          {title}
        </span>
        <span className="block truncate text-xs leading-4 text-neutral-500 dark:text-neutral-400">
          {description}
        </span>
      </span>
    </Link>
  );
}

const CLOSE_DELAY_MS = 120;

function DesktopLink({
  link,
  label,
  titles,
  descriptions,
  variant,
  open,
  onOpen,
  onClose,
}: {
  link: NavLink;
  label: string;
  titles: Record<SubLink["titleKey"], string>;
  descriptions: Record<SubLink["descKey"], string>;
  variant: Variant;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}): ReactNode {
  const reducedMotion = useReducedMotion() ?? false;
  const panelId = useId();
  const closeTimer = useRef(0);

  const cancelClose = (): void => window.clearTimeout(closeTimer.current);
  const scheduleClose = (): void => {
    cancelClose();
    closeTimer.current = window.setTimeout(onClose, CLOSE_DELAY_MS);
  };
  useEffect(() => cancelClose, []);

  if (!link.items) {
    return (
      <li>
        <Link href={link.href} className={LINK_CLASS}>
          {label}
        </Link>
      </li>
    );
  }

  const onBlur = (e: FocusEvent<HTMLLIElement>): void => {
    if (!e.currentTarget.contains(e.relatedTarget)) onClose();
  };

  const panelMotion = reducedMotion
    ? {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.12 },
    }
    : {
      initial: { opacity: 0, y: -6 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.22, ease: softEase },
      },
      exit: {
        opacity: 0,
        y: -4,
        transition: { duration: 0.15, ease: quickEase },
      },
    };

  const triggerClass = `${LINK_CLASS} gap-1 pr-2.5 ${open ? "text-neutral-900 dark:text-white" : ""}`;
  const triggerInner = (
    <>
      {label}
      <ChevronDown
        aria-hidden
        className={`h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      />
    </>
  );

  return (
    <li
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        onOpen();
      }}
      onMouseLeave={scheduleClose}
      onBlur={onBlur}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      {link.href.startsWith("#") ? (
        <a
          href={link.href}
          onFocus={onOpen}
          aria-expanded={open}
          aria-controls={panelId}
          className={triggerClass}
        >
          {triggerInner}
        </a>
      ) : (
        <Link
          href={link.href}
          onFocus={onOpen}
          aria-expanded={open}
          aria-controls={panelId}
          className={triggerClass}
        >
          {triggerInner}
        </Link>
      )}

      <div className="absolute top-full left-0 z-20 pt-2">
        <AnimatePresence>
          {open && (
            <motion.div
              key="panel"
              id={panelId}
              {...panelMotion}
              className={`w-[288px] rounded-[0.75rem] border p-1.5 will-change-[opacity,transform] ${PANEL_SURFACE[variant]}`}
            >
              <ul className="flex flex-col">
                {link.items.map((item) => (
                  <li key={item.titleKey}>
                    <SubLinkRow
                      title={titles[item.titleKey]}
                      description={descriptions[item.descKey]}
                      href={item.href}
                      icon={item.icon}
                      tint={item.tint}
                      onClick={onClose}
                    />
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}

function BurgerIcon({ open }: { open: boolean }): ReactNode {
  const reducedMotion = useReducedMotion() ?? false;
  const transition: Transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: softEase };
  const bar = "absolute left-0 h-[2px] w-full rounded-full bg-current";
  return (
    <span aria-hidden="true" className="relative block h-[10px] w-4">
      <motion.span
        className={bar}
        initial={false}
        animate={
          open
            ? { top: "50%", y: "-50%", rotate: 45 }
            : { top: 0, y: 0, rotate: 0 }
        }
        transition={transition}
      />
      <motion.span
        className={bar}
        initial={false}
        animate={
          open
            ? { top: "50%", y: "-50%", rotate: -45 }
            : { top: "100%", y: "-100%", rotate: 0 }
        }
        transition={transition}
      />
    </span>
  );
}

interface MenuProps {
  menuOpen: boolean;
  panelId: string;
  toggleRef: RefObject<HTMLButtonElement | null>;
  onToggle: () => void;
}

function NavContent({
  className,
  variant,
  menuOpen,
  panelId,
  toggleRef,
  onToggle,
}: MenuProps & { className?: string; variant: Variant }): ReactNode {
  const t = useTranslations("Nav");
  const ts = useTranslations("Home.services");
  const locale = useLocale();
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);

  const otherLocale = locale === "en" ? "id" : "en";
  const langLabel = locale === "en" ? "ID" : "EN";

  const labels: Record<NavLink["labelKey"], string> = {
    services: t("services"),
    works: t("works"),
    about: t("about"),
    news: t("news"),
  };
  const titles = {
    service1: ts("service1.title"),
    service2: ts("service2.title"),
    service3: ts("service3.title"),
    aboutStory: t("aboutStory"),
    aboutTeam: t("aboutTeam"),
  };
  const descriptions = {
    service1desc: t("service1desc"),
    service2desc: t("service2desc"),
    service3desc: t("service3desc"),
    aboutStoryDesc: t("aboutStoryDesc"),
    aboutTeamDesc: t("aboutTeamDesc"),
  };

  return (
    <div
      className={`grid h-full grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr] ${className ?? ""}`}
    >
      <Link href="/" aria-label="Merai home" className="inline-flex w-fit">
        <img
          src="/__merai__/logo.webp"
          alt="Merai"
          className="h-6 w-auto dark:invert invert-0"
        />
      </Link>

      <ul className="hidden items-center gap-1 md:flex">
        {LINKS.map((link) => (
          <DesktopLink
            key={link.labelKey}
            link={link}
            label={labels[link.labelKey]}
            titles={titles}
            descriptions={descriptions}
            variant={variant}
            open={active === link.labelKey}
            onOpen={() => setActive(link.labelKey)}
            onClose={() => setActive((v) => (v === link.labelKey ? null : v))}
          />
        ))}
      </ul>

      <div className="flex items-center justify-end gap-2">
        <Link
          href={pathname}
          locale={otherLocale}
          className={`${LINK_CLASS} max-sm:hidden`}
        >
          {langLabel}
        </Link>
        <Link href="/contact" className={PRIMARY_CLASS}>
          {t("contactUs")}
        </Link>
        <button
          ref={toggleRef}
          type="button"
          onClick={onToggle}
          aria-expanded={menuOpen}
          aria-controls={panelId}
          aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
          className={`inline-flex h-10 w-10 items-center justify-center text-neutral-900 dark:text-white transition-colors hover:bg-neutral-900/8 dark:hover:bg-white/8 ${FOCUS_RING} ${CONTROL_RADIUS} md:hidden`}
        >
          <BurgerIcon open={menuOpen} />
        </button>
      </div>
    </div>
  );
}

function MobileGroup({
  link,
  label,
  titles,
  descriptions,
  index,
  expanded,
  onToggle,
  onNavigate,
  firstRef,
}: {
  link: NavLink;
  label: string;
  titles: Record<SubLink["titleKey"], string>;
  descriptions: Record<SubLink["descKey"], string>;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  firstRef: RefObject<HTMLAnchorElement | HTMLButtonElement | null>;
}): ReactNode {
  const reducedMotion = useReducedMotion() ?? false;
  const regionId = useId();
  const rowClass = `w-[calc(100%+1rem)] -mx-2 flex items-center justify-between px-2 py-4 text-left text-2xl font-medium tracking-tight text-neutral-900 dark:text-white ${FOCUS_RING} ${CONTROL_RADIUS}`;

  if (!link.items) {
    return (
      <>
        <Link
          ref={index === 0 ? (firstRef as RefObject<HTMLAnchorElement>) : null}
          href={link.href}
          onClick={onNavigate}
          className={rowClass}
        >
          {label}
          <span
            aria-hidden="true"
            className="text-base text-neutral-500 dark:text-neutral-400"
          >
            →
          </span>
        </Link>
        <span className="block h-px bg-neutral-200 dark:bg-neutral-800" />
      </>
    );
  }

  return (
    <>
      <button
        ref={index === 0 ? (firstRef as RefObject<HTMLButtonElement>) : null}
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={regionId}
        className={rowClass}
      >
        {label}
        <ChevronDown
          aria-hidden
          className={`h-5 w-5 text-neutral-500 dark:text-neutral-400 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="region"
            id={regionId}
            initial={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={
              reducedMotion
                ? { opacity: 1 }
                : { height: "auto", opacity: 1, transition: EASE_OUT }
            }
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { height: 0, opacity: 0, transition: EASE_IN }
            }
            className="overflow-hidden"
          >
            <ul className="-mx-2 flex flex-col gap-0.5 pb-3">
              {link.items.map((item) => (
                <li key={item.titleKey}>
                  <SubLinkRow
                    title={titles[item.titleKey]}
                    description={descriptions[item.descKey]}
                    href={item.href}
                    icon={item.icon}
                    tint={item.tint}
                    onClick={onNavigate}
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <span className="block h-px bg-neutral-200 dark:bg-neutral-800" />
    </>
  );
}

function MobileList({
  onNavigate,
  firstRef,
  itemMotion,
}: {
  onNavigate: () => void;
  firstRef: RefObject<HTMLAnchorElement | HTMLButtonElement | null>;
  itemMotion: (index: number) => Record<string, unknown>;
}): ReactNode {
  const t = useTranslations("Nav");
  const ts = useTranslations("Home.services");
  const [expanded, setExpanded] = useState<string | null>(null);

  const labels: Record<NavLink["labelKey"], string> = {
    services: t("services"),
    works: t("works"),
    about: t("about"),
    news: t("news"),
  };
  const titles = {
    service1: ts("service1.title"),
    service2: ts("service2.title"),
    service3: ts("service3.title"),
    aboutStory: t("aboutStory"),
    aboutTeam: t("aboutTeam"),
  };
  const descriptions = {
    service1desc: t("service1desc"),
    service2desc: t("service2desc"),
    service3desc: t("service3desc"),
    aboutStoryDesc: t("aboutStoryDesc"),
    aboutTeamDesc: t("aboutTeamDesc"),
  };

  return (
    <ul className="flex flex-col">
      {LINKS.map((link, i) => (
        <motion.li key={link.labelKey} {...itemMotion(i)}>
          <MobileGroup
            link={link}
            label={labels[link.labelKey]}
            titles={titles}
            descriptions={descriptions}
            index={i}
            expanded={expanded === link.labelKey}
            onToggle={() =>
              setExpanded((v) => (v === link.labelKey ? null : link.labelKey))
            }
            onNavigate={onNavigate}
            firstRef={firstRef}
          />
        </motion.li>
      ))}
    </ul>
  );
}

function MobileMenu({
  open,
  panelId,
  onClose,
}: {
  open: boolean;
  panelId: string;
  onClose: () => void;
}): ReactNode {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion() ?? false;
  const firstLinkRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const otherLocale = locale === "en" ? "id" : "en";
  const langLabel = locale === "en" ? "ID" : "EN";

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(
      () => firstLinkRef.current?.focus(),
      reducedMotion ? 0 : 200
    );
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose, reducedMotion]);

  const panelMotion = reducedMotion
    ? {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.15 },
    }
    : {
      initial: { opacity: 0, y: -12 },
      animate: { opacity: 1, y: 0, transition: EASE_OUT },
      exit: { opacity: 0, y: -8, transition: EASE_IN },
    };

  const itemMotion = (index: number) =>
    reducedMotion
      ? {}
      : {
        initial: { opacity: 0, y: 14 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { ...EASE_OUT, delay: 0.08 + index * 0.05 },
        },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-white dark:bg-neutral-950 pt-16 md:hidden"
          {...panelMotion}
        >
          <nav aria-label="Mobile" className="px-5 pt-4">
            <MobileList
              onNavigate={onClose}
              firstRef={firstLinkRef}
              itemMotion={itemMotion}
            />
          </nav>

          <motion.div className="px-5 pt-6" {...itemMotion(LINKS.length)}>
            <div className="flex items-center gap-3">
              <Link
                href={pathname}
                locale={otherLocale}
                onClick={onClose}
                className={`inline-flex h-12 flex-1 items-center justify-center border border-neutral-200 dark:border-neutral-800 text-base font-medium text-neutral-900 dark:text-white transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900 ${FOCUS_RING} ${CONTROL_RADIUS}`}
              >
                {langLabel}
              </Link>
              <Link
                href="/contact"
                onClick={onClose}
                className={`inline-flex h-12 flex-[2] items-center justify-center bg-neutral-900 dark:bg-white text-base font-medium text-white dark:text-neutral-900 transition-opacity hover:opacity-85 ${FOCUS_RING} ${CONTROL_RADIUS}`}
              >
                {t("contactUs")}
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const [docked, setDocked] = useState(false);
  const [hasHero, setHasHero] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  // Hero presence is route-dependent and the hero can mount after this
  // component (streaming). Re-check on every route/locale change and watch
  // the DOM so late mounts / client navigations never leave stale state.
  useEffect(() => {
    const checkHero = (): void => {
      setHasHero(document.getElementById(HERO_ID) !== null);
    };
    checkHero();
    const mo = new MutationObserver(checkHero);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [pathname, locale]);

  // Docked state derives from scroll position, not hero intersection.
  // Pages without a hero stay docked; pages with a hero undock at the top
  // so scrolling back to top reliably restores the overlay variant.
  useEffect(() => {
    if (!hasHero) {
      setDocked(true);
      return;
    }
    let raf = 0;
    const update = (): void => {
      raf = 0;
      setDocked(window.scrollY > NAV_TIMING.dockedThresholdPx);
    };
    const onScroll = (): void => {
      if (raf === 0) raf = window.requestAnimationFrame(update);
    };
    // Sync immediately — covers route changes where SmoothScroll already
    // scrolled to top, and restores overlay when back at scrollY 0.
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== 0) window.cancelAnimationFrame(raf);
    };
  }, [hasHero, pathname, locale]);

  // Close the mobile menu on navigation so it never stays open / locks
  // body scroll on the next page.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, locale]);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (): void => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      {!hasHero && <div className="h-16" aria-hidden="true" />}

      {/* Single AnimatePresence with mode="wait" so the overlay and docked
          headers never co-exist during the switch (previously the absolute
          header mounted instantly while the fixed header was still exiting
          with y:-100%, perceived as a stuck/flashing navbar). */}
      <AnimatePresence initial={false} mode="wait">
        {!docked && hasHero && (
          <motion.header
            key="overlay-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reducedMotion ? { duration: 0.15 } : EASE_IN}
            className="absolute inset-x-4 top-6 z-10 h-[3.75rem] px-6"
          >
            <NavContent
              variant="glass"
              menuOpen={menuOpen}
              panelId={panelId}
              toggleRef={toggleRef}
              onToggle={toggleMenu}
            />
          </motion.header>
        )}

        {docked && (
          <motion.header
            key="docked-nav"
            // Entry takes longer than exit (taste rule): enter EASE_OUT 0.4s,
            // exit EASE_IN 0.25s so scrolling back to top feels snappy.
            {...(reducedMotion
              ? {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  transition: { duration: 0.15 },
                }
              : {
                  initial: { y: "-100%" },
                  animate: { y: 0, transition: EASE_OUT },
                  exit: { y: "-100%", transition: EASE_IN },
                })}
            className="fixed inset-x-0 lg:px-8 sm:px-6 px-4 top-0 z-40 h-16 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
          >
            <NavContent
              variant="solid"
              menuOpen={menuOpen}
              panelId={panelId}
              toggleRef={toggleRef}
              onToggle={toggleMenu}
              className={DOCKED_COLUMN}
            />
          </motion.header>
        )}
      </AnimatePresence>

      <MobileMenu open={menuOpen} panelId={panelId} onClose={closeMenu} />
    </>
  );
}

export default Navbar;
