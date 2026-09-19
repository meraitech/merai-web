"use client";

import {
  Atom,
  ChartColumn,
  Cloud,
  Container,
  Database,
  FileCode,
  Flame,
  FlaskConical,
  Frame,
  Gauge,
  GitBranch,
  Globe,
  LayoutTemplate,
  Network,
  PenTool,
  Search,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Terminal,
  Triangle,
  Wind,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useTranslations } from "next-intl";
import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type PointerEvent,
  type ReactNode,
} from "react";

type Icon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

const TOOLS: { name: string; icon: Icon }[] = [
  { name: "React", icon: Atom },
  { name: "Next.js", icon: Triangle },
  { name: "TypeScript", icon: FileCode },
  { name: "Node.js", icon: Server },
  { name: "Flutter", icon: Smartphone },
  { name: "Python", icon: Terminal },
  { name: "PostgreSQL", icon: Database },
  { name: "Tailwind CSS", icon: Wind },
  { name: "Docker", icon: Container },
  { name: "Cloud", icon: Cloud },
  { name: "CI/CD", icon: GitBranch },
  { name: "UI/UX Design", icon: PenTool },
  { name: "GraphQL", icon: Network },
  { name: "Firebase", icon: Flame },
  { name: "Figma", icon: Frame },
  { name: "REST API", icon: Globe },
  { name: "Testing", icon: FlaskConical },
  { name: "Analytics", icon: ChartColumn },
  { name: "SEO", icon: Search },
  { name: "Security", icon: ShieldCheck },
  { name: "Performance", icon: Gauge },
  { name: "E-commerce", icon: ShoppingCart },
  { name: "AI Solutions", icon: Sparkles },
  { name: "CMS", icon: LayoutTemplate },
];

const SPRING = { stiffness: 160, damping: 22, mass: 0.6 };

function Tile({
  name,
  icon: TileIcon,
  cx,
  cy,
  px,
  py,
  intensity,
  reducedMotion,
}: {
  name: string;
  icon: Icon;
  cx: number;
  cy: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  intensity: MotionValue<number>;
  reducedMotion: boolean;
}): ReactNode {
  const lift = useTransform([px, py, intensity], ([x, y, k]) => {
    const dx = ((x as number) - cx) * 1.6;
    const dy = (y as number) - cy;
    const d = Math.hypot(dx, dy);
    return Math.max(0, 1 - d / 0.34) * (k as number);
  });
  const z = useTransform(lift, (l) => l * 44);
  const scale = useTransform(lift, (l) => 1 + l * 0.08);
  const front = useTransform(lift, (l) => (l > 0.02 ? 10 : 0));
  const shadow = useTransform(
    lift,
    (l) =>
      `0 ${8 + l * 22}px ${24 + l * 30}px -${14 - l * 4}px rgba(0,0,0,${0.12 + l * 0.16})`
  );

  return (
    <motion.li
      style={reducedMotion ? {} : { z, scale, boxShadow: shadow, zIndex: front }}
      className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/60 dark:border-white/10 bg-[#d9f3fc] dark:bg-[#151d28] shadow-[0_8px_24px_-14px_rgba(0,0,0,0.12)] transform-3d"
    >
      <TileIcon
        className="h-5 w-5 sm:h-6 sm:w-6 text-neutral-900 dark:text-white"
        aria-hidden
      />
      <span className="text-[10px] font-semibold tracking-wide text-neutral-700 dark:text-neutral-300 sm:text-[11px]">
        {name}
      </span>
    </motion.li>
  );
}

export function SmokeWisps(): ReactNode {
  const reducedMotion = useReducedMotion() ?? false;
  if (reducedMotion) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10"
    >
      <motion.div
        className="absolute top-[38%] -left-[10%] h-[30%] w-[60%] rounded-full bg-white/40 blur-[80px] dark:bg-white/10"
        animate={{ x: ["0%", "18%", "0%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-15%] bottom-[2%] h-[35%] w-[65%] rounded-full bg-white/30 blur-[100px] dark:bg-white/[0.08]"
        animate={{ x: ["0%", "-15%", "0%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function HeroTileGrid(): ReactNode {
  const t = useTranslations("Home.toolbox");
  const reducedMotion = useReducedMotion() ?? false;
  const stageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const [cols, setCols] = useState(8);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const n = getComputedStyle(el).gridTemplateColumns.split(" ").length;
      setCols(n);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const rows = Math.ceil(TOOLS.length / cols);

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const rawK = useMotionValue(0);
  const px = useSpring(rawX, SPRING);
  const py = useSpring(rawY, SPRING);
  const intensity = useSpring(rawK, { stiffness: 120, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start 0.9", "end 0.2"],
  });
  const baseTilt = useTransform(scrollYProgress, [0, 1], [50, 40]);
  const rotateX = useTransform(
    [baseTilt, py, intensity],
    ([b, y, k]) => (b as number) - ((y as number) - 0.5) * 6 * (k as number)
  );
  const rotateY = useTransform(
    [px, intensity],
    ([x, k]) => ((x as number) - 0.5) * 8 * (k as number)
  );

  const onMove = (e: PointerEvent<HTMLDivElement>): void => {
    if (reducedMotion || e.pointerType !== "mouse") return;
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top) / rect.height);
    rawK.set(1);
  };
  const onLeave = (): void => {
    rawK.set(0);
    rawX.set(0.5);
    rawY.set(0.5);
  };

  return (
    <div className="relative">
      <div
        ref={stageRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="pt-14 [perspective:900px]"
      >
        <motion.ul
          ref={gridRef}
          aria-label={t("gridLabel")}
          style={reducedMotion ? {} : { rotateX, rotateY }}
          className={`mx-auto grid w-full origin-top grid-cols-4 gap-3 transform-3d sm:grid-cols-6 sm:gap-4 lg:grid-cols-8 ${reducedMotion ? "[transform:rotateX(44deg)]!" : ""}`}
        >
          {TOOLS.map((tool, i) => (
            <Tile
              key={tool.name}
              name={tool.name}
              icon={tool.icon}
              cx={((i % cols) + 0.5) / cols}
              cy={(Math.floor(i / cols) + 0.5) / rows}
              px={px}
              py={py}
              intensity={intensity}
              reducedMotion={reducedMotion}
            />
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
