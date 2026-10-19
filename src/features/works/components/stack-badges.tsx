import type { IconType } from "react-icons";
import {
  SiDrizzle,
  SiFramer,
  SiGsap,
  SiMongodb,
  SiNextdotjs,
  SiPayloadcms,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiVercel,
} from "react-icons/si";
import { Code2 } from "lucide-react";

const iconByStack: Record<string, IconType> = {
  "next.js": SiNextdotjs,
  react: SiReact,
  "tailwind css": SiTailwindcss,
  "framer motion": SiFramer,
  framer: SiFramer,
  motion: SiFramer,
  vercel: SiVercel,
  "three.js": SiThreedotjs,
  three: SiThreedotjs,
  "payload cms": SiPayloadcms,
  payload: SiPayloadcms,
  mongodb: SiMongodb,
  gsap: SiGsap,
  drizzle: SiDrizzle,
};

export function StackIcon({ name }: { name: string }) {
  const Icon = iconByStack[name.toLowerCase()] ?? Code2;
  return <Icon size={14} aria-hidden className="shrink-0" />;
}

export function StackBadges({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((s) => (
        <span
          key={s}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800"
        >
          <StackIcon name={s} />
          {s}
        </span>
      ))}
    </div>
  );
}
